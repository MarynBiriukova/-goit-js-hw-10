import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import '../css/styles.css';



iziToast.settings({
  position: "topRight",
  messageColor: "#ffffff",
  iconColor: "#ffffff",
  borderRadius: "8px",
  theme: "dark",
  progressBar: false,
});


const form = document.querySelector('.form');

form.addEventListener('submit', (evt) => {
    
    evt.preventDefault();

    const delay = Number(evt.currentTarget.elements.delay.value);
    const state = evt.currentTarget.elements.state.value;

    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') resolve(delay);
            else reject(delay);

        }, delay);    
    
    });

    result
                .then((data) => {
                    //console.log(`✅ Fulfilled promise in ${data}ms`);
                    iziToast.success({
                        message: `Fulfilled promise in ${data}ms`,
                        backgroundColor: "#59b17a",
                        });
            
                })
                .catch((data) => {
                    //console.log(`❌ Rejected promise in ${data}ms`);
                   iziToast.error({
                        message: `Rejected promise in ${data}ms`, 
                        backgroundColor: "#ef4040",
                        });
                })

    form.reset();
})
