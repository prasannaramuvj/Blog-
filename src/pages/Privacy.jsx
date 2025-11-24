import Container from 'react-bootstrap/Container';

function Privacy() {
    return (
        <Container className="py-5">
            <h1 className="mb-4">Privacy Policy</h1>
            <p>Last updated: November 24, 2025</p>
            <p>
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
            </p>
            <h3>Collecting and Using Your Personal Data</h3>
            <p>
                We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
            </p>
            <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Usage Data</li>
            </ul>
            <p>
                We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
        </Container>
    );
}

export default Privacy;
