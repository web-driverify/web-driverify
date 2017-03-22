import Endpoint from '..'

class ExecuteAsyncScript extends Endpoint {
  static create (req) {
    let {script, args} = req.body
    return new ExecuteAsyncScript([script, args])
  }
}
ExecuteAsyncScript.url = '/session/:sid/execute_async'
ExecuteAsyncScript.method = 'post'
export default Endpoint.register(ExecuteAsyncScript)
