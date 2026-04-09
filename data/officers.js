// ============================================================
// OFFICERS & STAFF — Edit this file to update bios or add people
// ============================================================
// featured  — full officer cards with photo and biography
// staff     — small staff cards (name + role only)
//
// Featured officer fields:
//   photo          — image filename (must be in the root folder)
//   photoAlt       — screen-reader text for the photo
//   extraPhotoClass — optional extra CSS class on the <img> (leave as "" if not needed)
//   rank           — rank badge text shown above the name
//   name           — full name and rank
//   bio            — array of paragraph strings (each string = one paragraph)
//   tags           — array of short label chips shown at the bottom
// ============================================================

window.officersData = {
    featured: [
        {
            photo: "folwer.jpg",
            photoAlt: "Captain Shawn Fowler",
            extraPhotoClass: "",
            rank: "Commanding Officer",
            name: "Captain Shawn Fowler",
            bio: [
                "Captain Shawn Fowler began his cadet career in September 1988 as an Air Cadet at 715 Mohawk Squadron RCACC in Burlington, Ontario. He credits the 3 years he served with 715 for instilling in him his sense of service to the cadet program and to the community.",
                "Lt Fowler returned to the Canadian Cadet Organization (CCO) as a Civilian Volunteer in 2013, a Civilian Instructor in 2015, and then enrolled in the Canadian Armed Forces through the Cadet Instructor Cadre on February 9, 2017. He was commissioned in 2018 and promoted to his current rank in June 2022. He has been the Training Officer (TrgO) since the 2018-2019 Training Year.",
                "Captain Fowler attended Laurentian University in Sudbury from 1993-1998 and graduated with a Bachelor of Arts (Honours) in Social Science (Law and Justice) and a Master of Arts in Interdisciplinary Humanities. He currently is a Senior Auto Physical Damage Claims Adjuster with CUMIS General Insurance in Burlington and is pursuing the Certified Insurance Professional (CIP) Designation.",
                "Capt. Fowler lives in Hamilton with his wife Janice and his two children, Doviron and Corvalia."
            ],
            tags: ["CIC Officer", "Training Officer", "MA, BA (Hons)"]
        },
        {
            photo: "jodi.jpg",
            photoAlt: "Captain Jodi Mitchell",
            extraPhotoClass: "",
            rank: "Officer",
            name: "Captain Jodi Mitchell",
            bio: [
                "Captain Jodi Mitchell began her interest in the military at the young age of 13 when she joined the #748 G.G.H.G. Army Cadet Corps in Markham. She progressed through the ranks reaching the position of Cadet RSM. After aging out, she joined the Canadian Armed Forces primary reserve as an officer in the 49th Field Artillery Regiment, Sault Ste. Marie, completing her RESO training in Gagetown, New Brunswick.",
                "From 1992 to 1996 she held positions as a reconnaissance and fire direction officer. Upon graduating with a Bachelor of Science in Criminal Justice, Captain Mitchell transferred to the Cadet Instructors Cadre, initially working with the #440 Appleby College Cadet Corps in Oakville as Training Officer, DCO, and Commanding Officer. In 2009 she transferred to 2379 RHLI RCACC Burlington.",
                "Captain Mitchell recently retired from the Toronto Police Service after 27 years of service where she held the rank of Sergeant. She worked in various units including the Community Response Unit, Major Crime Unit, Gun and Gang Task Force, and Major Project Section. In December 2012 she was seconded to the RCMP and spent one year in Afghanistan training the Afghan National Police.",
                "Captain Mitchell is the recipient of the European Security and Defence Policy Medal for Afghanistan, the Peacekeeping Medal, the Queen's Golden Jubilee Medal, the Canadian Forces Decoration with Bar, and the Police Exemplary Service Medal."
            ],
            tags: ["Toronto Police (Ret.)", "Afghanistan Veteran", "BSc Criminal Justice"]
        },
        {
            photo: "ron.jpg",
            photoAlt: "Captain Ron Harris",
            extraPhotoClass: "",
            rank: "Officer",
            name: "Captain Ron Harris",
            bio: [
                "Captain Ron Harris, CD1 was introduced to the Canadian Forces in 1995 as a cadet in the 2379 RHLI Army Cadet Corps, eventually progressing to Chief Warrant Officer (Regimental Sergeant Major). In 2000, he joined the Primary Reserves as a Non-commissioned Member of the Royal Hamilton Light Infantry (Wentworth Regiment).",
                "In 2003 he enrolled in the Cadet Instructor Cadre as an Officer Cadet and was appointed Training Officer of the 2379 Army Cadets. He served as a Platoon Commander at Blackdown Army Cadet Summer Training Centre. Commissioned as a Second Lieutenant in 2004, promoted to Lieutenant in 2005, and appointed Commanding Officer in 2009.",
                "Following his tenure as Commanding Officer, he served in various capacities including Training Officer and Deputy Commanding Officer. After transferring to 105 Royal Canadian Artillery Army Cadet Corps in Streetsville in 2022, he returned to 2379 in the fall of 2024 as Training Officer.",
                "Capt Harris holds two Bachelor of Arts degrees from McMaster University in History and Political Science. He has served as an Officer with the Canada Border Services Agency since 2005."
            ],
            tags: ["Former CO", "CBSA Officer", "2x BA McMaster"]
        },
        {
            photo: "officer.jpg",
            photoAlt: "Captain (Retired) Phil Harris",
            extraPhotoClass: "officer-photo--phil",
            rank: "Civilian Instructor",
            name: "Captain (Retired) Phil Harris",
            bio: [
                "Captain Harris joined the Canadian Armed Forces and completed Basic Training at Cornwallis, Nova Scotia in October 1972. He served as a Non-Commissioned Member of the Grey and Simcoe Foresters and Lorne Scots infantry reserve regiments as an anti-tank gunner, mortarman, small arms coach, and section commander before being commissioned from the ranks.",
                "In 1995 he resumed his commission with the Cadet Instructor Cadre at 2379 RHLI. He established a competitive shooting program, trained Cadet Challenge competitors, and introduced the Duke of Edinburgh program. He served as Commanding Officer from 2003 to 2006.",
                "Captain Harris is the Chief of Operations at the John C. Munroe Hamilton International Airport with 35 years of service in the CBSA. He is the recipient of the Peace Officer Exemplary Service Medal with Maple Leaf and Bar, and the Queen's Jubilee Medal. He has been married for 31 years to his wife April and has two sons — Ron and Matt — both previous RSMs of the corps."
            ],
            tags: ["Former CO (2003–2006)", "35 Years CBSA", "Queen's Jubilee Medal"]
        }
    ],

    staff: [
        { name: "Christopher Merkle",  role: "Civilian Instructor" },
        { name: "Priscilla Capellan",  role: "Civilian Volunteer" },
        { name: "Michaela Paterson",   role: "Civilian Volunteer" }
    ]
};
