import axios from 'axios';


export const getCaptcha = async () =>{
  axios.get('http://localhost:3000/getCaptcha').then(res => {
    console.log(res);
    if (res.data.code === 200) {
      imgSvg.value = res.data.msg;
    }
  })
}