import { Item, NotesInterface } from "./interfaces";


/**
 * `Notes` class that implements `NotesInterface`
 */
export class Notes implements NotesInterface {
    
    // private date store of only `Item` types
    private store: Item[] = []
    
    // tracks last item id
    private lastId: number = 0


    constructor () {
        // re-initialize with random number
        this.lastId = Math.floor(Math.random() * 1234567890 + 1234567890)
    }

    /**
     * Size - the number of items in the store 
     */
    get size () {
        return this.store.length
    } 

    /**
     * `Add` method to insert a new item 
     * @param title 
     * @param content 
     */
    add (title: string, content: string): void {
        /**
         * All notes must be of `Item` type
         */
        let newNote: Item = {
            // increment `lastId` and assign it 
            id: ++this.lastId,
            title,
            content,
            // current timestamp
            timestamp: new Date().getTime()
        }
        /**
         * Push the note
         */
        this.store.push(newNote)
        // Track notes in background
        console.log("Current State: ", this.store)
    }

    /**
     * `Remove` method to remove an item by `id`
     * @param id 
     * @returns 
     */
    remove (id: number): void {
        // `id` must be a finite number 
        if (!Number.isFinite(id)) return
        /**
         * Locate the `id` and remove the `Item` it belongs to
         */
        for (let i = 0; i < this.size; i++) {
            if (this.store[i].id === id) {
                console.log('Removing: ', this.store[i])
                this.store = this.store.slice(0, i).concat(this.store.slice(i+1,))
            }
        }
    }

    /**
     * Private method to compile `item` and insert it into `el`
     * @param item 
     * @param el 
     */
    private mount (item: Item, el: HTMLDivElement): void {
        /**
         * Create a DIV element to house this note
         */
        const elem = document.createElement("div")
        // Global CSS class name
        elem.className = "notes-item"
        // Tightly hold the `id` in the element's dataset
        elem.setAttribute("data-id", <string><unknown>item.id)
        // compute time from timestamp
        const time = new Date(item.timestamp)
        // build the HTML for this element
        elem.innerHTML = `
            <div class="title">
                [${
                    (time.getHours() < 10 
                        ? '0' + time.getHours() 
                        : time.getHours()
                    ) + ':' + 
                    (time.getMinutes() < 10 
                        ? '0' + time.getMinutes() 
                        : time.getMinutes()
                    )
                }] ~ ${item.title}
            </div>
            <div class="content">
                ${item.content}
            </div>
        `
        /**
         * Delete note at double click
         */
        elem.addEventListener('dblclick', () => { 
            // Remove the item
            this.remove(parseInt(<string><unknown>elem.dataset.id, 10))
            // Re-mount after changes
            this.#mountEl && this.render(this.#mountEl)
        })
        /**
         * Finally, insert the element 
         */
        el.append(elem)
    }

    // Hold the mount element reference behind the scenes
    #mountEl: HTMLDivElement | null = null

    /**
     * `Render` method to display all items in `store` into target `el`
     * @param el 
     * @returns 
     */
    render(el: HTMLDivElement): void {
        // validate el
        if (!el) return
        // Save the mount element
        this.#mountEl = el
        // Clear room for space
        el.innerHTML = ""
        // Incase there are no items
        if (this.size === 0) {
            el.innerHTML = `<p style="text-align: center; padding: 20px 0;"><i>Empty</i></p>`  
            return 
        }
        // Other show all items
        for (const item of this.store.slice().reverse()) {
            this.mount(item, el)
        }
    }

}
