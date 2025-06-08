package model;
import java.util.*;
public class UserData {
    private Set<String> favorites = new LinkedHashSet<>();
    private List<String> recent = new LinkedList<>();
    public void addFavorite(String id){ favorites.add(id); }
    public void removeFavorite(String id){ favorites.remove(id); }
    public Set<String> getFavorites(){ return favorites; }
    public void addRecent(String id){
        recent.remove(id);
        recent.add(0,id);
        if(recent.size()>20) recent.remove(20);
    }
    public List<String> getRecent(){ return recent; }
}
