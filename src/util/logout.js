export const logout = () => {
    debugger
    localStorage.removeItem("token");
    window.location.reload();
}