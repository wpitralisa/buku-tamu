document.getElementById('bukuTamuForm').addEventListener('submit', function(e){
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const loadingIcon = document.getElementById('loading');
    const nama = document.getElementById('Nama').value;
    const asal = document.getElementById('Asal Instansi').value;
    const keperluan = document.getElementById('Keperluan').value;

    submitBtn.disabled = true;    //jika sudah diklik tidak bisa diklik lagi
    loadingIcon.classList.remove('d-none');

    fetch('https://script.google.com/macros/s/AKfycbyc46iscodH1Mx03nrd7HxwsEG-LGGUU1AfTl4wfyMRtfp4SEytMlhjW-h0sGWfhufjbA/exec', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : new URLSearchParams({
            'Nama' : nama,
            'Asal Instansi' : asal,
            'Keperluan' : keperluan,
        })
            
    })
    .then(response => response.text())
    .then(data => {
        submitBtn.disabled = false;
        loadingIcon.classList.add('d-none');
        Swal.fire({
            title: 'Berhasil',
            text: 'Data berhasil ditambah',
            icon: 'Success',
            confirmButton: 'OK'
        }).then((result) => {
            if(result.isConfirmed){
                window.location.href = 'index.html'
            }
        });
    })
    .catch((error) => {   //jika data yg diinput gagal
        submitBtn.disabled = false;
        loadingIcon.classList.add('d-none');
        console.log('Error : ', error);
        Swal.fire({
            title: 'Gagal',
            text:'Gagal ditambah, karena' + error.message,
            icon:'error',
            confirmButton:'OK'
        });
    });
    
});
