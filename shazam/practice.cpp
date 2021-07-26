#include <iostream>
using namespace std;

int main() {
	// your code goes here
	double r;
	cin>>r;
	double sum;
	double series= 2*r;
	double parallel1= (4*r)/(4*r+4*r);
	double parallel2=(6*r+12*r)/(6*r*12*r);
	sum=series+parallel1+parallel2;
	double current=16/sum;
	cout<<"Resistance: "<< sum<< endl;
	cout<<"Current: "<< current;
	return 0;
}