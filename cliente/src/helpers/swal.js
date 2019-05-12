// import Sweetalert2
import Swal from 'sweetalert2';

export function showSwall(title, text, type) {
    Swal.fire({
        title: title,
        text: text,
        type: type,
        confirmButtonText: 'Ok'
    });
}


export function confirm(){
    return Swal.fire({
        title: 'Estas seguro de eliminar el registro?',
        text: "No podras revertir esta acción!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
    })
}