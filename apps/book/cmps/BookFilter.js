export default {
    template: `
        <section class="book-filter">
            <fieldset>

                <legend>Search</legend>
                <input 
                v-model="filterBy.txt" 
                @input="onSetFilterBy"
                type="text" 
                placeholder="search by title">
            </fieldset>
                <fieldset>
                    <legend>Language</legend>
                    <input type="text"
                    list="languages"
                    @input="onSetFilterBy"
                    v-model="filterBy.language" 
                    >
                    
                    <datalist id="languages">
                            <option></option>
                            <option>en</option>
                            <option>he</option>
                            <option>sp</option>
                    </datalist>
                </fieldset>
                <fieldset>
                    <legend>Pages</legend>
                    <input 
                    v-model="filterBy.minPageCount" 
                    @input="onSetFilterBy"
                    type="number" 
                    placeholder="0000">
                    <input 
                    v-model="filterBy.maxPageCount" 
                    @input="onSetFilterBy"
                    type="number" 
                    placeholder="2000">
                </fieldset>
                <fieldset>
                    <legend>Publishing Date</legend>
                    <input 
                    v-model="filterBy.minDate" 
                    @input="onSetFilterBy"
                    type="number" 
                    placeholder="1820">
                    <input 
                    v-model="filterBy.maxDate" 
                    @input="onSetFilterBy"
                    type="number" 
                    placeholder="2025">
                </fieldset>
                <!-- <pre>{{filterBy}}</pre> -->
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                language: '',
                minPageCount: 0,
                maxPageCount:2000,
                minDate: 0,
                maxDate: 2024
            }
        }
    },
    methods: {
        onSetFilterBy() {
            this.$emit('filter', { ...this.filterBy })
        }
    }
}

