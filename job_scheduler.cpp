#include <iostream>
#include <vector>
#include <algorithm>
#include <fstream>
#include <string>
#include <sstream>

class Job {
public:
    char id;
    int deadline;
    int profit;
    
    Job(char id, int deadline, int profit) : id(id), deadline(deadline), profit(profit) {}
    
    bool operator<(const Job& other) const {
        return profit > other.profit; 
    }
};

class JobScheduler {
private:
    std::vector<Job> jobs;
    int maxDeadline;
    std::vector<char> schedule;
    
public:
    void addJob(char id, int deadline, int profit) {
        jobs.emplace_back(id, deadline, profit);
        maxDeadline = std::max(maxDeadline, deadline);
    }
    
    void scheduleJobs() {
       
        schedule = std::vector<char>(maxDeadline + 1, '-');
        
      
        std::sort(jobs.begin(), jobs.end());
        
        for (const auto& job : jobs) {
            
            for (int i = job.deadline; i > 0; --i) {
                if (schedule[i] == '-') {
                    schedule[i] = job.id;
                    break;
                }
            }
        }
    }
    
    void saveResults(const std::string& filename) const {
        std::ofstream file(filename);
        if (!file) {
            std::cerr << "Error opening output file" << std::endl;
            return;
        }
        
        
        int totalProfit = 0;
        for (const auto& job : jobs) {
            for (int i = 1; i <= job.deadline; ++i) {
                if (schedule[i] == job.id) {
                    totalProfit += job.profit;
                    break;
                }
            }
        }
        
        
        file << "Scheduled Jobs: ";
        for (const auto& job : schedule) {
            if (job != '-') {
                file << job << " ";
            }
        }
        file << std::endl;
       
        file << "Total Profit: " << totalProfit << std::endl;
        
       
        file << "Schedule: ";
        for (int i = 1; i <= maxDeadline; ++i) {
            file << schedule[i] << " ";
        }
        file << std::endl;
        
        file.close();
    }
};

int main() {
    JobScheduler scheduler;
    
  
    std::ifstream inputFile("input.txt");
    if (!inputFile) {
        std::cerr << "Error opening input file" << std::endl;
        return 1;
    }
    
    std::string line;
    while (std::getline(inputFile, line)) {
        std::istringstream iss(line);
        char id;
        int deadline, profit;
        if (iss >> id >> deadline >> profit) {
            scheduler.addJob(id, deadline, profit);
        }
    }
    
    
    scheduler.scheduleJobs();
    
    
    scheduler.saveResults("output.txt");
    
    return 0;
}
