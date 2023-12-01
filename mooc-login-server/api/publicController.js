import svgCaptcha from 'svg-captcha'
class publicController{
  constructor() {}
  async getCaptcha(ctx) {
    const captcha = svgCaptcha.create();
    ctx.body = {
      code: 200,
      msg: captcha.data
    }
  }
}

export default new publicController