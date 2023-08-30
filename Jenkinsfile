// #!/usr/bin/env groovy

// def JAVA_HOME = "C:/Program Files/Java/jdk1.8.0_202";
// def label = "staging_node_label";

// def branch = env.BRANCH_NAME;
// def tagName = env.TAG_NAME;
// def versionRegex = "^RELEASE_(\\d+\\.)(\\d+\\.)(\\*|\\d+)";
// def envDeploy = '';
// def homeDir = "D:/PLANNING/planning_frontend";
// println "Branch name:${env.BRANCH_NAME} tag name:${env.TAG_NAME}"

// if(tagName && tagName =~ versionRegex){
//     envDeploy = 'PROD';
// }else if(branch && branch.startsWith("release/")){
//     envDeploy = 'STAGING';
// }else if(branch && branch.startsWith("feature/")){
//     envDeploy = 'STAGING-TEST';
// }else{
//     println 'Ignore build'
//     currentBuild.result = 'ABORTED'
//     return
// }

// println "envDeploy = ${envDeploy}"

// if(envDeploy == "PROD"){
//     label = "master_node";
//     JAVA_HOME = "C:/Program Files/Java/jdk1.8.0_201";
//     homeDir = "C:/ProgramData/Jenkins/.jenkins/workspace/planning_frontend";
// }

// println "label = ${label} JAVA_HOME = ${JAVA_HOME}"

// node(label) {
//     stage('Checkout Scm') {
//       dir(homeDir){
//         checkout scm
//         frontendDeploy(envDeploy);
//       }
//     }

// }

// def frontendDeploy(envDeploy){
//       println 'Start deploy Front End'

//       if(envDeploy =='PROD' || envDeploy == 'STAGING'){
//         stage('npm install'){
//           bat "npm install"
//         }

//         stage('npm run build'){
//           bat "npm run build"
//         }
//     	}
// //     	else{
// //     	  stage('npm stop'){
// //           bat "npm run stop-3001"
// //         }
// //
// //         stage('npm install'){
// //           bat "npm install"
// //         }
// //
// //     	  stage('npm start'){
// //     	    bat "npm run start-3001"
// //     	  }
// //     	}
// }

pipeline {
    agent {label "APS_MK"}
    stages{
        stage ('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner';
                    withSonarQubeEnv() {
                        sh "${scannerHome}/sonar-scanner-4.8.1.3023/bin/sonar-scanner"
                    }
                }
            }
        }
        stage("Quality Gate") {
            steps {
                script {
                    timeout(time: 1, unit: 'HOURS') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }
        stage("Check old image") {
            steps {
                sh 'docker rm -f mk-aps-frontend || echo "this container does not exist" '
                sh 'docker image rm -f aps_mkfrontend-frontend || echo "this image dose not exist" '
            }
        }
        stage('Build and Run') {
            steps {
                sh 'docker compose up -d --build'
             }
        }
    }
}