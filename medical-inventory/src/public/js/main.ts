import axios from "axios";
import * as M from "materialize-css";
import Vue from "vue";

// tslint:disable-next-line no-unused-expression
new Vue( {
    computed: {
        hazGuitars(): boolean {
            return this.isLoading === false && this.guitars.length > 0;
        },
        noGuitars(): boolean {
            return this.isLoading === false && this.guitars.length === 0;
        }
    },
    data() {
        return {
            BrandId: "",
            Name: "",
            guitars: [],
            isLoading: true,
            TypeId: "",
            selectedGuitar: "",
            selectedGuitarId: 0,
            Comment: ""
        };
    },
    el: "#app",
    methods: {
        addGuitar() {
            const guitar = {
                BrandId: this.BrandId,
                Name: this.Name,
                TypeId: this.TypeId,
                Comment: this.Comment
            };
            axios
                .post( "/api/modeldata/add", guitar )
                .then( () => {
                    this.BrandId = "";
                    this.Name = "";
                    this.TypeId = "";
                    this.Comment = "";
                    this.loadGuitars();
                } )
                .catch( ( err: any ) => {
                    // tslint:disable-next-line:no-console
                    console.log( err );
                } );
        },
        confirmDeleteGuitar( id: string ) {
            const guitar = this.guitars.find( ( g ) => g.BrandId === id );
            this.selectedGuitar = `${ guitar.Name } ${ guitar.TypeId } ${ guitar.Comment }`;
            this.selectedGuitarId = guitar.BrandId;
            const dc = this.$refs.deleteConfirm;
            const modal = M.Modal.init( dc );
            modal.open();
        },
        deleteGuitar( id: string ) {
            axios
                .delete( `/api/modeldata/remove/${ id }` )
                .then( this.loadGuitars )
                .catch( ( err: any ) => {
                    // tslint:disable-next-line:no-console
                    console.log( err );
                } );
        },
        loadGuitars() {
            axios
                .get( "/api/modeltype" )
                .then( ( res: any ) => {
                    this.isLoading = false;
                    this.guitars = res.data;
                } )
                .catch( ( err: any ) => {
                    // tslint:disable-next-line:no-console
                    console.log( err );
                } );
        }
    },
    mounted() {
        return this.loadGuitars();
    }
} );