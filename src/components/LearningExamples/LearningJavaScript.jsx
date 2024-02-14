
const person =
{
    name: 'Sunny Bhardwaj',
    address: {
        line1: 'Baker Street',
        city: 'London',
        country: 'UK',
    },
    profiles: ['twitter', 'linkedin', 'facebook'],

    printProfile: () =>
    {
        person.profiles.map(profile => { console.log(profile) })
    }

}

export default function LearningJavaScript()
{
    return (
        <>
            <div>{person.name}</div>
            <div>{person.address.line1}</div>
            <div>{person.profiles[0]}</div>
            <>{person.printProfile()}</>

        </>
    )

}