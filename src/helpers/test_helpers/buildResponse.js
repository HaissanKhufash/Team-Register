async function buildResponse({app , route, expectedResponse}) {
    const response = await request(app).get(route);

    expect(response.statusCode).toBe(200);
}