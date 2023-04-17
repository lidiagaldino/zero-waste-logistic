class Queue {
    private queue: {id: string}[]

    public getQueue(){
        return this.queue
    }

    public setQueue(newQueue: {id: string}[]){
        this.queue = newQueue
    }

    public deleteFromQueueById(id: {id: string}){
        const index = this.queue.indexOf(id)

        if(index != -1) this.queue.splice(index, 1)
    }
}

export default new Queue()