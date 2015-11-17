

class Test {
    private msg:string;

    @log
    sendMessage(Message: string) {
        this.msg = Message;
        return this.msg;
    }
}



function log(target:Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    var originalMethod = descriptor.value;

    descriptor.value =   function(...args: any[]) {
        console.log("The method args are: " + JSON.stringify(args)); // pre
        var result = originalMethod.apply(this, args);               // run and store the result
        console.log("The return value is: " + result);               // post
        return result;                                               // return the result of the original method
    };

}


interface  SlingResource {
     user: string;
}



class UserModel implements SlingResource{
    @Resource
    public user: string;
    @log
    getUser() {
        return this.user;
    }

}

function Resource(target:Object, descriptor: TypedPropertyDescriptor<any>) {
    descriptor.value = "annotated user";

}



var test = new Test().sendMessage("hello world");

var test2 = new UserModel().getUser();