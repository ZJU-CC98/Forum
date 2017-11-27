import * as React from 'react';
import { LogOn } from './LogOn';
import * as Utility from '../Utility';
export class LogOut extends React.Component<{}, {}>{
    render() {
        return <div style={{
            display: "flex", flexDirection: "column"
        }}>
            <div>您当前未登录</div>
            <LogOn />
        </div>;
    }
}
export class TopicDeleted extends React.Component<{}, {}>{
    render() {
        return <div>帖子被删除</div>;
    }
}
export class Disconnected extends React.Component<{}, {}>{
    render() {
        return <div>网络连接中断</div>;
    }
}
export class UnauthorizedBoard extends React.Component<{}, {}>{
    render() {
        return <div>401您没有权限进入这个版面</div>;
    }
}
export class UnauthorizedTopic extends React.Component<{}, {}>{
    render() {
        return <div>401您没有权限进入这个帖子</div>;
    }
}
export class NotFoundBoard extends React.Component<{}, {}>{
    constructor(props, context) {
        super(props, context);
    }
    async componentDidMount() {
        const token = Utility.getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append("Authorization", token);
        headers.append("Content-Type", "application/json");
        const content =  "test" ;
        const response = await fetch(

            `http://apitest.niconi.cc/topic/deletetop?topicid=4739872&boardid=753`,
            {
                method: "DELETE",
                headers,
                body: JSON.stringify(content)
            }
        );
        console.log("finished");
    }
    render() {
        return <div>404版面不存在</div>;
    }
}
export class NotFoundTopic extends React.Component<{}, {}>{
    async componentDidMount() {
        const token = Utility.getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append("Authorizaton", token);
        const body = {
            isCanceling: false,
            isBold: true,
            isItalic: true,
            color: "red",
            duration:null
        }
        const str = JSON.stringify(body);
        const url = 'http://apitest.niconi.cc/topic/sethighlight?boardid=753&topicid=4739872'
        await fetch(url, { method: "PUT", headers, body: str });


    }
    render() {
        return <div>404帖子不存在</div>;
    }
}
export class NotFoundUser extends React.Component<{}, {}>{
    render() {
        return <div>404用户不存在</div>;
    }
}
export class ServerError extends React.Component<{}, {}>{
    render() {
        return <div>500服务器错误</div>;
    }
}
export class ContentNeeded extends React.Component<{}, {}>{
    render() {
        return <div>402需要输入内容</div>
    }
}
export class OperationForbidden extends React.Component<{}, {}>{
    render() {
        return <div>403操作被拒绝</div>
    }
}
/*
class student {
    private:
        long id;
        string name;
        double averageGrade;
        string major;
        int gradeClass;
        string majorClass;
        double totalGradePoint;
        enum studentType;
public:
    showAllCourseGrade(){
    //在表四中通过学号找到学生选的所有课程
    courseNumber[] = search in database4
   //对于每一门课程，在表二中找到这个学号的成绩并存起来
    loop
    foreach course in courseNumber search grade in database 2
    save in grade[]
    return grade;
}
    //计算平均成绩
    getAverageGrade(grade[]){
    double gpa = average(sum of grade[]);
    return gpa;
}
}
class Course {
    private:
        string courseId;
        string courseName;
        string teachers;
        string student;
        double grade;
    public:
    //对某个课程号，找到所有选这门课学生的成绩信息
    showAllGradesInCourse(){
    message: { student, grade } [] = search courseId in database2
    return message[];
    }
    //对某个课程、老师，找到所有选这个老师这门课学生的成绩信息
    showGradeOfTeacher(string teacher){
    message: { student, grade } [] = search { couseId, teacher }in database 2;
    return message[];
    }
    //对于某个老师的某节课的所有学生找出他们的成绩
    showGradeOfTeacherClass(string teacher,string time){
    message: { student, grade } [] = search { couseId, teacher, time }in database 2;
    return message[];
}
    //录入成绩
    setGrade(courseId,student,grade){
    add { courseId, student, grade } in database 4;
    }
    //修改成绩
    alterGrade(courseId, student, grade){
    update { courseId, student, grade } in database 4;   
}
    //删除成绩
    deleteGrade(courseId, student, grade){
    delete { courseId, student, grade } in database 4;
}
}
class CourseAndStudentRelationship {
    //数据库表4，,记录课程——学生的关系
    private:
        string courseId;
        string courseName;
        string studentName;
        long studentId;
        string teacher;
    public:
    //找到一个学生选的所有课
    getAllStudentCourses(studentId){
    courses[] = search studentId in database 2 for his or her courses;
    }
    //找到一个课所有的学生
    getAllStudentsInCourse(courseId){
    students[] = search courseId in database 3 for all students;
    }
}
class Teacher {
    private:
        string courses[];
    public:
        //找到一个老师打出的所有成绩
        getGrade(teacher){
            messages: { student, grade } [] = search teacher in database2 for all grades;
                 return messages[];
        }
        //找到一个老师一门课程打出的所有成绩
        getGrade(teacher, courseId) {
            messages: { student, grade } [] = search { teacher, courseId } in database2 for all grades;
             return messages[];
    }
        //找到一个老师某节课全班的成绩
     getGrade(teacher, courseId,time) {
         messages: { student, grade }[] = search { teacher, courseId, time } in database2 for all grades;
            return messages[];
    }
}
class Major {
    private:
        string majorName;
    public:
        //通过专业名字找到这个专业所有的学生
        getAllStudents(majorName){
            students[] = search majorName in database1 for all students in this major;
            return students[];
        }
        //通过学生ID找到所有的平均成绩并组成键值对
    getGrade(students[]) {
        messages{ student, grade }[] = search students[] in database1 for all grades in this major;
        return messages[];
    }
}
class majorClass {
    private:
        string className;
    public:
        //通过班级名字找到班内所有同学
        getStudents(className){
            students[] = search className in database1 for all students in this class;
            return students[];
        }
          //通过学生ID找到所有的平均成绩并组成键值对
    getGrade(students[]) {
        messages{ student, grade } [] = search student in database1 for all grades;
            return messages[];
    }
}
class gradeClass {
    private:
        int gradeClass;
    public:
        //通过年级找到本年级所有学生
        getStudent(gradeClass){
            students[] = search gradeClass in database1 for all students in this gradeClass;
            return students[];
        }
        //通过学生ID找到他们成绩的键值对
        getGrade() {
        messages{ student, grade } [] = search students in database1 for grades;
            return messages[];
    }
}
*/
