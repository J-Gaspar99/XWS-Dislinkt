
import NewCompanyRegForm from '../components/reg/NewCompanyRegForm';


function CompanyRegPage() {

  function addCompanyHandler(meetupData) {
    fetch(
      'https://',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  return (
    <section>
      <h1>Company Registration</h1>
      <NewCompanyRegForm onAddCompany={addCompanyHandler}/>
    </section>
  );
}

export default CompanyRegPage;