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
        name: 'Administration',
        icon: 'fa fa-cogs',
        interfaces: [
            { name: 'Application Designer', url: '' },
            { name: 'Generator', url: '/generator' }
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