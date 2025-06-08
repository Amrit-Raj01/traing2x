@WebServlet("/songs")
public class SongServlet extends HttpServlet {
    private List<Song> songs;
    public void init(){
        songs = JsonUtil.read("data/songs.json", new TypeReference<List<Song>>() {});
    }
    protected void doGet(HttpServletRequest req, HttpServletResponse res){
        String cat=req.getParameter("cat"), q=req.getParameter("q");
        Stream<Song> s = songs.stream();
        if(cat!=null) s=s.filter(x->x.getCategory().equalsIgnoreCase(cat));
        if(q!=null) s=s.filter(x->x.getTitle().toLowerCase().contains(q.toLowerCase()));
        writeJson(res, s.collect(Collectors.toList()));
    }
}
