#include <iostream>
using namespace std;

int main() {
int amount;
int duration;
double interest;
cin>>amount;
cin>>duration;
switch (duration) {
  case 6:
	interest=.03*amount;
    cout << interest;
    break;
  case 12:
    interest=.035*amount;
    cout << interest;
    break;
  case 24:
    interest=.04*amount;
    cout << interest;
    break;
  case 36:
    interest=.04*amount;
    cout << interest;
    break;
  case 60:
    interest=.04*amount;
    cout << interest;
    break;
  default:
    cout << "Invalid Input";
    break;
}
}