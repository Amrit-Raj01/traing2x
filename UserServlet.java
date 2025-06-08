@WebServlet("/user")
public class UserServlet extends HttpServlet {
    private UserData user;
    public void init(){
        user = JsonUtil.read("data/userdata.json", UserData.class);
    }
    protected void doPost(...) { // handle add/remove favorite and addRecent
        String action = req.getParameter("action"), id = req.getParameter("id");
        switch(action){
            case "fav": user.addFavorite(id); break;
            case "unfav": user.removeFavorite(id); break;
            case "recent": user.addRecent(id); break;
        }
        JsonUtil.write("data/userdata.json", user);
        writeJson(res, user);
    }
    protected void doGet(...) { writeJson(res, user); }
}
