import Endpoint from '..'

class ExecuteScript extends Endpoint {
  static create (req) {
    let {script, args} = req.body
    return new ExecuteScript([script, args])
  }
}
ExecuteScript.url = '/session/:sid/execute'
ExecuteScript.method = 'post'
export default ExecuteScript
