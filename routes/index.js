const routes = {
  inbound: async ctx => {
    // Get the detail of who sent the message, and the message itself
    const { from, message } = ctx.request.body;
    console.log(from, message);
    ctx.status = 200;
  },
  status: async ctx => {
    const status = await ctx.request.body;
    console.log(status);
    ctx.status = 200;
  }
};
 
module.exports = routes;