const explorer = {
    id: "100",
    name: "main",
    isFolder: true,
    items: [
        {
            id: "101",
            name: "assets",
            isFolder: true,
            items: [
                {
                    id: "102",
                    name: "images",
                    isFolder: true,
                    items: [
                        {
                            id: "103",
                            name: "logo.png",
                            isFolder: false,
                            items: []
                        },
                        {
                            id: "104",
                            name: "background.jpg",
                            isFolder: false,
                            items: []
                        }
                    ]
                },
                {
                    id: "105",
                    name: "videos",
                    isFolder: true,
                    items: [
                        {
                            id: "106",
                            name: "intro.mp4",
                            isFolder: false,
                            items: []
                        }
                    ]
                }
            ]
        },
        {
            id: "107",
            name: "components",
            isFolder: true,
            items: [
                {
                    id: "108",
                    name: "Header.js",
                    isFolder: false,
                    items: []
                },
                {
                    id: "109",
                    name: "Footer.js",
                    isFolder: false,
                    items: []
                },
                {
                    id: "110",
                    name: "Sidebar.js",
                    isFolder: false,
                    items: []
                }
            ]
        },
        {
            id: "111",
            name: "README.md",
            isFolder: false,
            items: []
        }
    ]
};

export default explorer;
