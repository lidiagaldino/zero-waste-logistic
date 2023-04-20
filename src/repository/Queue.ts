class Queue {
  private queue: number[];

  public getQueue() {
    return this.queue;
  }

  public setQueue(newQueue: number[]) {
    this.queue = newQueue;
  }

  public deleteFromQueueById(id: number) {
    console.log(id + " oidoioioiiiiiiiiiiiii");
    console.log(this.queue);
    const index = this.queue.indexOf(id);

    if (index != -1) this.queue.splice(index, 1);
  }
}

export default new Queue();
