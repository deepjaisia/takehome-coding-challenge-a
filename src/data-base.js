class Database {
    
    constructor() {
        this.targets = {
            headers: [ "Company Info", "Status", "Key Contacts", "Financial Performance", "Edit/Delete" ],
            data: new Map(),
        }
        this.count = null;
        this.init();
        this.unUsedId = [];
    }
    
    init() {
        let dataToPush = [ 
            { id: 0, status: 1, companyInfo: "Dummy Corp 1", keyContacts: "Alice: 809123, Bob: 123514", financialPerformance: "2015: 10000 | 2016: 12000 | 2017: 14000" },
            { id: 1, status: 2, companyInfo: "Dummy Corp 2", keyContacts: "John: 897523, Nate: 234525", financialPerformance: "2015: 20000 | 2016: 18000 | 2017: 24000" },
            { id: 2, status: 3, companyInfo: "Dummy Corp 3", keyContacts: "Carol: 234509, Devon: 890324", financialPerformance: "2015: 40000 | 2016: 36000 | 2017: 30000" },
            { id: 3, status: 4, companyInfo: "Dummy Corp 4", keyContacts: "Mary: 234589, Helen: 123519", financialPerformance: "2015: 12000 | 2016: 20000 | 2017: 30000" },
            { id: 4, status: 3, companyInfo: "Dummy Corp 4", keyContacts: "Carol: 234509, Devon: 890324", financialPerformance: "2015: 40000 | 2016: 36000 | 2017: 30000" },
            { id: 5, status: 4, companyInfo: "Dummy Corp 5", keyContacts: "Mary: 234589, Helen: 123519", financialPerformance: "2015: 12000 | 2016: 20000 | 2017: 30000" },
        ];
        dataToPush.map((data) => { this.targets.data.set(data.id, data) });
        this.count = this.targets.data.size;
    }

    targetSchema() {
        return {
            companyInfo: "",
            status: 1,
            keyContacts: "",
            financialPerformance: ""
        }
    }

    addToTargets({ id, status, companyInfo, keyContacts, financialPerformance }) {
        if(this.targets.data.has(id)) {
            this.deleteRow(id);
            this.targets.data.set(id, { id, status, companyInfo, keyContacts, financialPerformance })
            return;
        }
        else {
            let currId;
            if(this.unUsedId.length === 0){
                currId = this.count;
                this.count += 1;
            }
            else {
                currId = this.unUsedId.pop();
            }
            this.targets.data.set(currId, { id: currId, status, companyInfo, keyContacts, financialPerformance });
            return;
        }
    }

    deleteRow(id) {
        if(this.targets.data.has(id)){ 
            this.targets.data.delete(id)
            this.unUsedId.push(id);
        }
        return;
    }

    getTarget(id) {
        if(this.targets.data.has(id)){
            return this.targets.data.get(id)
        }
        return;
    }

    getTargetsStatus() {
        let totalStatus = { "1": 0, "2": 0, "3": 0, "4": 0 }
        this.targets.data.forEach((target) => {
            let currStatus = target.status;
            totalStatus[currStatus] += 1;
        })
        console.log(totalStatus);
        return totalStatus;
    }

    save() {
        console.log(this.targets);
        window.localStorage.setItem("data", JSON.stringify(this.targets));
    }

    load() {
        let dataToLoad = JSON.parse(window.localStorage.getItem("data"));
        if(dataToLoad) {
            this.targets = dataToLoad;
        }
    }
}

export default Database;