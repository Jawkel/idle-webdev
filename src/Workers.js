export const Workers = [
    {
        name: "UI",
        gain: 2, // $20/h
        gainTime: 1,
        gainStep: 1.05,
        avatar: "/images/ui.png",
        task: "Designing",
        cost: 25,
    },
    {
        name: "Dev Front",
        gain: 8, // $35/h
        gainTime: 2,
        gainStep: 1.1,
        avatar: "/images/dev_front.png",
        task: "Writing HTML/CSS",
        cost: 100,
    },
    {
        name: "Dev CMS",
        gain: 20, // $37/h
        gainTime: 4,
        gainStep: 1.12,
        avatar: "/images/dev_cms.png",
        task: "Elementoring WP",
        cost: 1000,
    },
    {
        name: "UX",
        gain: 30, // $47/h
        gainTime: 5,
        gainStep: 1.13,
        avatar: "/images/ux.png",
        task: "User storying",
        cost: 5000,
    },
    {
        name: "Dev Back",
        gain: 100, // $47/h
        gainTime: 10,
        gainStep: 1.25,
        avatar: "/images/back.png",
        task: "Node JSing",
        cost: 10000,
    },
    {
        name: "Dev FullStack",
        gain: 200, // $47/h
        gainTime: 12,
        gainStep: 1.42,
        avatar: "/images/fullstack.png",
        task: "Juggling",
        cost: 25000,
    },
    {
        name: "Agency",
        gain: 2000, // $47/h
        gainTime: 15,
        gainStep: 1.50,
        avatar: "/images/agency.png",
        task: "Acquiring Clients",
        cost: 100000,
    },
    {
        name: "Cloud",
        gain: 25000, // $47/h
        gainTime: 30,
        gainStep: 2,
        avatar: "/images/cloud.png",
        task: "Jeff Bossing",
        cost: 1000000,
    },
];

export const Steps = [
    {
        title: "Junior",
        limit: 100,
        timeDiviser: 1,
    },
    {
        title: "Regular",
        limit: 250,
        timeDiviser: 1.5,
    },
    {
        title: "Confirmed",
        limit: 500,
        timeDiviser: 2,
    },
    {
        title: "Senior",
        limit: 1000,
        timeDiviser: 2.5,
    },
    {
        title: "Guru",
        limit: 5000,
        timeDiviser: 4,
    },
];
// export default Workers;
