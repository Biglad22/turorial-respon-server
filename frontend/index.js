//HTTP REQUEST
const api = axios.create({
    baseURL: 'http://localhost:1996',
    headers: {
      'Content-Type': 'application/json'
    }
});
  

const submitBtn = document.getElementById('contact-submit-btn');
const field = document.getElementById('user-email');
const fieldErr = document.getElementById('inputErr');
let userEmail;

field.onchange = (e) => userEmail = e.target.value;
submitBtn.onclick = () => submitUserEmail(userEmail);



async function submitUserEmail(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    try {

        if(!emailRegex.test(email)) throw new Error('please enter a valid email');
        
        const res = await api.post('/contacts',{email}, { responseType: 'blob' })
        const blob = await res.data;
        
        const aTag = document.createElement('a');
        aTag.download = 'NFT.png';
        const url = window.URL.createObjectURL(blob);

        aTag.href = url;
        aTag.click();

        window.URL.revokeObjectURL(url);
        
        fieldErr.textContent = 'email stored!, you got a free NFT';
        field.value = '';
        if(!fieldErr.className.includes('isErrored')) fieldErr.classList.add('isErrored');

    } catch (error) {
        console.log(error);

        if(error.response)fieldErr.textContent = error.response.data.message;
        else fieldErr.textContent = error.message;
        if(!fieldErr.className.includes('isErrored')) fieldErr.classList.add('isErrored');
    }
}