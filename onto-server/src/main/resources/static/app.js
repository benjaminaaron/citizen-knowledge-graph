let stompClient = null;

const connect = () => {
    let socket = new SockJS('/onto-engine-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/serverBroadcasting', messageObj => {
            console.log("Server says: ", JSON.parse(messageObj.body).message);
        });
    });
    // stompClient.disconnect();
};

const addStatement = () => {
    let statement = {
        subject: $("#subjectTextField").val(),
        predicate: $("#predicateTextField").val(),
        object: $("#objectTextField").val()
    };
    stompClient.send("/app/serverReceiveAddStatements", {}, JSON.stringify(statement));
};

const sendCommand = () => {
    let command = {
        command: $("#commandTextField").val()
    }
    stompClient.send("/app/serverReceiveCommand", {}, JSON.stringify(command));
};

$(() => {
    connect();
    $("#addStatementBtn").click(() => { addStatement(); });
    $("#sendCommandBtn").click(() => { sendCommand(); });
});