import handler from "../util/handler";
import dynamodb from "../util/dynamodb";

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);
    console.log(data.content);
    console.log(data.attachment)    
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            noteId: event.pathParameters.id
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content|| null,
        },
        ReturnValues : "ALL_NEW"
    }
    await dynamodb.update(params)
    return { status: true }
})