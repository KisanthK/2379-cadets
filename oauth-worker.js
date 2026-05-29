// ─────────────────────────────────────────────────────────────
// GitHub OAuth proxy — deploy this as a Cloudflare Worker
//
// Environment variables to set in the Worker dashboard:
//   GITHUB_CLIENT_ID     — your GitHub OAuth App client ID
//   GITHUB_CLIENT_SECRET — your GitHub OAuth App client secret
// ─────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Step 1 — CMS opens this URL to start the OAuth flow
    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        scope: 'repo,user',
        redirect_uri: `${url.origin}/callback`,
      });
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params}`,
        302
      );
    }

    // Step 2 — GitHub redirects here after the user approves
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return messagePage('error', 'No code received from GitHub');
      }

      // Exchange the temporary code for an access token
      const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${url.origin}/callback`,
        }),
      });

      const data = await res.json();

      if (data.error || !data.access_token) {
        return messagePage('error', data.error_description || 'Failed to get access token');
      }

      return messagePage('success', { token: data.access_token, provider: 'github' });
    }

    return new Response('Not Found', { status: 404 });
  },
};

// Sends a postMessage back to the CMS popup window
function messagePage(status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!DOCTYPE html>
<html>
<body>
<script>
var msg = ${JSON.stringify(message)};
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(msg, e.origin);
    window.close();
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
