package util;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
public class JsonUtil {
    private static ObjectMapper M = new ObjectMapper();
    public static <T> T read(String path, Class<T> cl)throws Exception{
        return M.readValue(new File(path), cl);
    }
    public static void write(String path, Object obj)throws Exception{
        M.writerWithDefaultPrettyPrinter().writeValue(new File(path), obj);
    }
}
