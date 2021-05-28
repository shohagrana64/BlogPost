import axios from "axios";
import * as M from "materialize-css";
import Vue from "vue";
// tslint:disable-next-line no-unused-expression

new Vue( {
    computed: {
        hazMedicals(): boolean {
            return this.isLoading === false && this.medicals.length > 0;
        },
        noMedicals(): boolean {
            return this.isLoading === false && this.medicals.length === 0;
        }
    },
    data() {
        return {
            BrandId: "",
            Name: "",
            medicals: [],
            isLoading: true,
            TypeId: "",
            selectedMedical: "",
            selectedMedicalId: 0,
            Comment: ""
        };
    },
    el: "#app",
    methods: {
        addMedical() {
            const medical = {
                BrandId: this.BrandId,
                Name: this.Name,
                TypeId: this.TypeId,
                Comment: this.Comment
            };
            axios
                .post( "/api/devicemodel", medical )
                .then( () => {
                    this.BrandId = "";
                    this.Name = "";
                    this.TypeId = "";
                    this.Comment = "";
                    this.loadMedicals();
                } )
                .catch( ( err: any ) => {
                    // tslint:disable-next-line:no-console
                    console.log( err );
                } );
        },
        confirmDeleteMedical( id: string ) {
            const medical = this.medicals.find( ( g ) => g.BrandId === id );
            this.selectedMedical = `${ medical.Name } ${ medical.TypeId } ${ medical.Comment }`;
            this.selectedMedicalId = medical.BrandId;
            const dc = this.$refs.deleteConfirm;
            const modal = M.Modal.init( dc );
            modal.open();
        },
        confirmDescribe( name: string ) {
            const medical = this.medicals.find( ( g ) => g.Name === name );
            this.selectedMedical = `BrandID: ${ medical.BrandId } \nName: ${ medical.Name } \nTypeID: ${ medical.TypeId } \nComment: ${ medical.Comment }`;
            this.selectedMedicalId = medical.BrandId;
            const dc = this.$refs.describeConfirm;
            const modal = M.Modal.init( dc );
            modal.open();
        },
        deleteMedical( id: string ) {
            axios
                .delete( `/api/modeldata/remove/${ id }` )
                .then( this.loadMedicals )
                .catch( ( err: any ) => {
                    // tslint:disable-next-line:no-console
                    console.log( err );
                } );
        },
        loadMedicals() {
            axios
                .get( "/api/modeltype" )
                .then( ( res: any ) => {
                    this.isLoading = false;
                    this.medicals = res.data;
                } )
                .catch( ( err: any ) => {
                    // tslint:disable-next-line:no-console
                    console.log( err );
                } );
        }
    },
    mounted() {
        return this.loadMedicals();
    }
} );