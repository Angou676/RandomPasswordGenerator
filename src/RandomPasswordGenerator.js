const RandomPasswordGenerator = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";

    [...Array(length)].forEach(() => {
        const randomIndex = Math.floor(Math.random() * charset.length);
        console.log(randomIndex)
        password += charset[randomIndex];
    });
    return password;
};


export default RandomPasswordGenerator