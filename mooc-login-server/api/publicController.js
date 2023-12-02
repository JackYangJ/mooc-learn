import svgCaptcha from 'svg-captcha'
class publicController{
  constructor() {}
  async getCaptcha(ctx) {
    const captcha = svgCaptcha.create({
      noise: 2,
      color: true,
      width: 100,
      height: 50
    });
    ctx.body = {
      code: 200,
      msg: captcha.data
    }
  }
}

export default new publicController