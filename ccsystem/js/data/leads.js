var aryTriggers = [
    {id:'*', text:'All'},
    {id:'2012-06-01', text:'Event Trigger (2012-06-01)'},
    {id:'2012-06-02', text:'Event Trigger (2012-06-02)'},
    {id:'2012-06-03', text:'Event Trigger (2012-06-03)'}
];

var aryEvents = [
    {
        id:1,
        code:'SASEBMM-0031-A',
        type:'Maturity of Structure Project',
        description:'A principle protection deposit of 200,000 will be mature in 7 days.'
    },
    {
        id:2,
        code:'SASEBMM-0033-B',
        type:'Incomplete Online P-Loan Application',
        description:''
    }
];

var aryAccountActivities = {
    '123-456-890-123': [
        {
            no: '123-456-890-123',
            date:'2010-10-01',
            type:'Deposit',
            reference:'Salary',
            amount:123456,
            balance:123456,
            branch:'TPE'
        },
        {
            no: '123-456-890-123',
            date:'2010-10-01',
            type:'Deposit',
            reference:'Cheque',
            amount:123456,
            balance:123456,
            branch:'TPE'
        },
        {
            no: '123-456-890-123',
            date:'2010-10-03',
            type:'Withdraw',
            reference:'ATM',
            amount:123456,
            balance:123456,
            branch:'TCN'
        }
    ],
    '321-654-098-321':[
        {
            no: '321-654-098-321',
            date:'2010-10-01',
            type:'Payment',
            reference:'Store 1',
            amount:123456,
            balance:123456,
            branch:'n/a'
        },
        {
            no: '321-654-098-321',
            date:'2010-10-03',
            type:'Payment',
            reference:'Store 2',
            amount:123456,
            balance:123456,
            branch:'n/a'
        }
    ],
    '123-890-890-123':[
        {
            no: '123-890-890-123',
            date:'2010-10-03',
            type:'Withdraw',
            reference:'ATM',
            amount:123456,
            balance:123456,
            branch:'TCN'
        }
    ]
};

var aryCustomers = [
    {
        id:'C123456789',
        profile:{
            name:'洪金寶',
            gender:'Male',
            marital:'Married',
            birthday:'1973-06-15',
            nationality:'Taiwan',
            education:'大學',
            address: 'Taipei',
            type: 'Consumer',
            phone: '0911-111-111',
            area: 'North'
        },
        accounts:[
            {
                no:'123-456-890-123',
                type:'Saving',
                product:'Integrated Account',
                balance:150000000,
                available:150000000,
                status:'Active',
                openDate:'2005-10-01'
            },
            {
                no:'321-654-098-321',
                type:'Credit Card',
                product:'Platinum Visa',
                balance:500000,
                available:350000,
                status:'Active',
                openDate:'2007-10-01'
            }
        ],
        occupation:{
            company:'SAS Institute Inc.',
            address:'Taipei',
            telephone:'02-26428999',
            serviceYear:5,
            industry:'Software Consultancy',
            position:'Presale Consultant'
        },
        relationship:{
            tenure:6,
            lifeTimeValue:87.3,
            initialBranch:'TPE'
        },
        event: {
            id: aryEvents[0].id,
            master: findEventMaster(aryEvents[0].id),
            offers:[
                {
                    title:'Interest rebate for Renewal on PPO',
                    probability: 0.871,
                    description:'50 basis point per annual interest rebate for a deposit principal of more than 200,000'
                },
                {
                    title:'Cash voucher to mutual fund subscription',
                    probability:0.72,
                    description:'Free 300 gift voucher on the initial subscription with more than 200,000'
                }
            ]
        },
        contacts:[
            {
                datetime:'2010-05-15 11:11:11',
                staff:'n/a',
                channel:'Email',
                context:'No response',
                comment:'Promotion on personal loan'
            }
        ],
        activities: findAccountActivities(['123-456-890-123', '321-654-098-321'])
    },
    {
        id:'D123456789',
        profile:{
            name:'郭富城',
            gender:'Male',
            marital:'Single',
            birthday:'1977-09-21',
            nationality:'Taiwan',
            education:'碩士',
            address: 'Taipei',
            type: 'Consumer',
            phone: '0911-222-222',
            area: 'East'
        },
        accounts:[
            {
                no:'123-890-890-123',
                type:'Saving',
                product:'Integrated Account',
                balance:12000000,
                available:12000000,
                status:'Active',
                openDate:'2010-10-01'
            }
        ],
        occupation:{
            company:'SAS Institute Inc.',
            address:'Taipei',
            telephone:'02-26428999',
            serviceYear:1,
            industry:'Software Consultancy',
            position:'Technical Consultant'
        },
        relationship:{
            tenure:1,
            lifeTimeValue:10,
            initialBranch:'TPE'
        },
        event: {
            id: aryEvents[1].id,
            master: findEventMaster(aryEvents[1].id),
            offers:[]
        },
        contacts:[],
        activities: findAccountActivities(['123-890-890-123'])
    }
];

var aryAlerts = [
    {
        id:'alert_1',
        customerId:aryCustomers[0].id,
        customerName:aryCustomers[0].profile.name,
        customerType:'Consumer',
        event: aryCustomers[0].event.master,
        trigger:aryTriggers[1].id,
        expires:'2 Days'
    },
    {
        id:'alert_2',
        customerId:aryCustomers[1].id,
        customerName:aryCustomers[1].profile.name,
        customerType:'Consumer',
        event: aryCustomers[1].event.master,
        trigger:aryTriggers[2].id,
        expires:'1 Week'
    }
];

function findEventMaster(id) {
    return _.find(aryEvents, function(e) { return e.id == id; });
}

function findAccountActivities(aryNumbers) {
    var aryResult = [];
    for (var i = 0; i < aryNumbers.length; i++) {
        aryResult = _.union(aryResult, aryAccountActivities[aryNumbers[i]]);
    }
    return aryResult;
}