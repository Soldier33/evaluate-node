$('#insertBtn').hide()

//下拉框
function selectChange () {
    var stuGrade = $("#grade option:selected").val()
    var stuClass = $("#classes option:selected").val()
    if(stuGrade !=='0' && stuClass !=='0')
        $('#insertBtn').show()
    else
        $('#insertBtn').hide() 
    $.get('/node/student/select/',{
        stuGrade: stuGrade,
        stuClass: stuClass
    },
    function(data) {   
        $('tbody').empty()
        for (const i of data) {
            $('tbody').append(
            `<tr>
                <td>${i.studentId}</td>
                <td>${i.studentName}</td>
                <td>${i.sex}</td>
                <td>${i.parentsName}</td>
                <td>${i.parentsPhone}</td>
                <td>${i.idCard}</td>
                <td>
                    <a href="#" data-id="${i.studentId}" data-toggle="modal" data-target="#myModal_2"><span>编辑</span></a>&nbsp;
                    <a href="#" data-id="${i.studentId}" data-drop="${i.studentId}" data-toggle="modal" data-target="#myModal_3"><span>删除</span></a>
                 </td>
            </tr>`
            );
        }     
    })
}

//选择年级
$('#grade').change( ()=> {
    selectChange()
})

//选择班级
$('#classes').change( ()=> {
    selectChange()
})

//编辑模态框
$('#myModal_2').on('show.bs.modal', function (event) {
    const modal = $(this)
    modal.find('#update').val($(event.relatedTarget).data('id'))

    var trs = $(event.relatedTarget).parent().parent().children()
    modal.find('#stuIdUp').val(trs.eq(0).text())
    modal.find('#stuNameUp').val(trs.eq(1).text())
    var index = trs.eq(2).text()
    if(index ==='男')
        index = 0
    if(index ==='女')
        index = 1   
    modal.find("input[name='stuSexUp']").eq(index).attr('checked', 'true')
    modal.find('#stuIdCardUp').val(trs.eq(5).text())
    modal.find('#stuParNameUp').val(trs.eq(3).text())
    modal.find('#stuParPhoneUp').val(trs.eq(4).text())
})
//新增模态框
$('#myModal_3').on('show.bs.modal', function (event) {
    const modal = $(this)
    modal.find('#delete').val($(event.relatedTarget).data('id'))
})

//正则
var regPhone = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
var regSix = /^((\d{6})|([0-9x]{6})|([0-9X]{6}))$/
var regName = /^[\u4e00-\u9fa5]{0,}$/


//增
$('#insert').click(()=>{
    var phone = $("input[id='stuParPhone']").val()
    var six =  $("input[id='stuIdCard']").val()
    var stuName = $("input[id='stuName']").val()
    var stuParName = $("input[id='stuParName']").val()
    
    if(!regName.test(stuName)) {
        alert('请输入您的中文名字')
        return
    }
    if(!regSix.test(six)) {
        alert('请输入合法的身份证后六位')
        return
    }
    if(!regName.test(stuParName)) {
        alert('请输入您父母的中文名字')
        return
    }
    if(!regPhone.test(phone)) {  
        alert('请输入合法的电话号码')
        return
    }   
    $.get('/node/student/new',{
        stuId: $("input[id='stuId']").val(),
        stuName: $("input[id='stuName']").val(),
        stuSex: $("input[name='stuSex']:checked").val(),
        stuIdCard: $("input[id='stuIdCard']").val(),
        stuParName: $("input[id='stuParName']").val(),
        stuParPhone: $("input[id='stuParPhone']").val(),
        stuGrade: $("#grade option:selected").val(),
        stuClass: $("#classes option:selected").val()
    },
    function(data) {
        if(data === 'fail') {
            alert("用户已存在")         
        } else {
            console.log('添加成功')
            $("#myModal_1").modal('hide')
            $('tbody').prepend(`
                <tr>
                    <td>${$("input[id='stuId']").val()}</td>
                    <td>${$("input[id='stuName']").val()}</td>
                    <td>${$("input[name='stuSex']:checked").val()}</td>
                    <td>${$("input[id='stuParName']").val()}</td>
                    <td>${$("input[id='stuParPhone']").val()}</td>                          
                    <td>${$("input[id='stuIdCard']").val()}</td>
                    <td>
                    <a href="###" data-id="${$("input[id='stuId']").val()}" data-toggle="modal" data-target="#myModal_2"><span>编辑</span></a>&nbsp;
                    <a href="###" data-id="${$("input[id='stuId']").val()}" data-drop="${$("input[id='stuId']").val()}" data-toggle="modal" data-target="#myModal_3"><span>删除</span></a>
                    </td>
                </tr>
            `)
            $("input[id='stuId']").val("")
            $("input[id='stuName']").val("")
            $("input[id='stuIdCard']").val("")
            $("input[id='stuParName']").val("")
            $("input[id='stuParPhone']").val("")
        }
        
    })
})
//删
$('#delete').click(()=>{
    $.get('/node/student/delete',{
        id: $("#delete").val(),
    },
    function(data) {
        console.log('删除成功')
        $('[data-drop='+$("#delete").val()+']').parent().parent().remove()
    })
})
//改
$('#update').click(()=>{
    var phone2 = $("input[id='stuParPhoneUp']").val()
    var six2 =  $("input[id='stuIdCardUp']").val()
    var stuName2 = $("input[id='stuNameUp']").val()
    var stuParName2 = $("input[id='stuParNameUp']").val()
  
    if(!regName.test(stuName2)) {
        alert('请输入您的中文名字')
        return
    }
    if(!regSix.test(six2)) {
        alert('请输入合法的身份证后六位')
        return
    }
    if(!regName.test(stuParName2)) {
        alert('请输入您父母的中文名字')
        return
    }
    if(!regPhone.test(phone2)) {  
        alert('请输入合法的电话号码')
        return
    }   
    console.log(3333);
    
    $.get('/node/student/update',{
        stuId: $("input[id='stuIdUp']").val(),
        stuName: $("input[id='stuNameUp']").val(),
        stuSex: $("input[name='stuSexUp']:checked").val(),
        stuIdCard: $("input[id='stuIdCardUp']").val(),
        stuParName: $("input[id='stuParNameUp']").val(),
        stuParPhone: $("input[id='stuParPhoneUp']").val(),
        stuGrade: $("#grade option:selected").val(),
        stuClass: $("#classes option:selected").val()
    },
    function(data) {
        console.log('更新')
        console.log($("input[id='stuIdCardUp']").val());
        
        $("#myModal_2").modal('hide')
        $('[data-drop='+$("input[id='stuIdUp']").val()+']').parent().parent().remove()
        $('tbody').prepend(`
        <tr>
            <td>${$("input[id='stuIdUp']").val()}</td>
            <td>${$("input[id='stuNameUp']").val()}</td>
            <td>${$("input[name='stuSexUp']:checked").val()}</td>
            <td>${$("input[id='stuParNameUp']").val()}</td>
            <td>${$("input[id='stuParPhoneUp']").val()}</td>                          
            <td>${$("input[id='stuIdCardUp']").val()}</td>
            <td>
            <a href="###" data-id="${$("input[id='stuIdUp']").val()}" data-toggle="modal" data-target="#myModal_2"><span>编辑</span></a>&nbsp;
            <a href="###" data-id="${$("input[id='stuIdUp']").val()}" data-drop="${$("input[id='stuIdUp']").val()}" data-toggle="modal" data-target="#myModal_3"><span>删除</span></a>
            </td>
        </tr>
        `)
    })
})
