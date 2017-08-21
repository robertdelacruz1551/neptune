export const OPERATOR = {
    username: 'test', 
    password: 'test', 
    name: 'John Smith', 
    title: 'Project Manager', 
    img: 'me.jpg', 
    home: '' 
};

export const APPLICATIONS = [
    {
        name: 'BPM Name',
        icon: 'fa fa-list',
        interfaces: [
            { name: 'Work Item List', url: '/authenticated/1' },
            { name: 'Create Work Item', url: '/authenticated/2' }
        ]
    },
    {
        name: 'Administration',
        icon: 'fa fa-cogs',
        interfaces: [
            { name: 'User', url: '/authenticated/93482484' },
            { name: 'Groups', url: '/authenticated/80302948' },
            { name: 'Account', url: '/authenticated/80302949' }
        ]
    }
];

// tslint:disable-next-line:eofline