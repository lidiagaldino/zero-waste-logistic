class Queue {
  private queue: string[];

  public getQueue() {
    return this.queue;
  }

  public setQueue(newQueue: string[]) {
    this.queue = newQueue;
  }

  public deleteFromQueueById(id: string) {
    console.log(id + " oidoioioiiiiiiiiiiiii");
    console.log(this.queue);
    const index = this.queue.indexOf(id);

    if (index != -1) this.queue.splice(index, 1);
  }
}

export default new Queue();
