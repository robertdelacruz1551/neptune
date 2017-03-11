export const OPERATOR = {
    username: 'test', 
    password: 'test', 
    name: 'John Smith', 
    title: 'Project Manager', 
    img: 'me.jpg', 
    home: '/auth/app/home' 
};

export const APPLICATIONS = [
    {
        name: 'Know Your Customer',
        icon: 'fa fa-user',
        interfaces: [
            { name: 'New Client (Dev)', url: '/auth/kyc/onboard/client/profile/0' },
            { name: 'Client Lookup', url: '/auth/kyc/onboard/client/search' }
        ]
    },
    {
        name: 'Administration',
        icon: 'fa fa-cogs',
        interfaces: [
            { name: 'User Management', url: '/auth/admin/user/list' },
        ]
    }, 
    {
        name: 'Development',
        icon: 'fa fa-cogs',
        interfaces: [
            { name: 'Table View', url: '/auth/table/1' }
        ]
    }
];

// tslint:disable-next-line:eofline