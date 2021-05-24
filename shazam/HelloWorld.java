public class HelloWorld {
    public static int sumOfDigits(int n, int s){
        if(n==0) return s;
        return sumOfDigits(n/10, s+(n%10));
    }
    public static int numDigits(int x)
    {  
      if (x == 0)
      {return 0;}
      else
      {
        return 1 + numDigits(x/10);
      }
    }
    public static int fabulous_digit(int n, int s){
        int p=sumOfDigits(n,0);
        int q=numDigits(p);
        if(q==1){
        return p;
        }
        //System.out.println(p + " "+ q);
        return fabulous_digit(p, q);
    }
    public static void main(String[] args) {
        System.out.println(fabulous_digit(192291, 6));
    }
}
