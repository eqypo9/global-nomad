# 스프린트 5기 7팀 고급 프로젝트

# 배포링크
https://nomad-ebon.vercel.app/

# Global Nomad
Global Nomad 는 여행을 계획할 때 사람들이 겪는 여러 고민
예를 들어, 여행지에서 어떤 체험을 할지, 비용은 얼마일지 등을 줄여주기 위한 플랫폼입니다

# 개발 기간
2024.07.04 ~ 2024.08.09

## 팀원 소개
<table>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/65326956?v=4"/><br/>
        <a href="https://github.com/mijin0928">팀장 우제윤</a>
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/60869993?v=4"/><br/>
        <a href="https://github.com/rladmswo1715">김은재</a>
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/125109615?v=4"/><br/>
        <a href="https://github.com/eqypo9">정성혜</a>
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/41028065?v=4" /><br/>
        <a href="https://github.com/waterkail">이현승</a>
      </td>
      <td align="center">
        <img width="100px" src="https://avatars.githubusercontent.com/u/102913030?v=4"><br/>
        <a href="https://github.com/SeungRyeolBaek">백승렬</a>
      </td>
    </tr>
  </tbody

## feat
저희는 프로젝트 규모가 작기 때문에
featuer/이름 브랜치에서 각자 작업 이어가면 될것 같습니다.


# PR
모든 브랜치의 병합과정에선 PR이 필요합니다.
PR를 병합하는데에는 몇가지 규칙이 존재합니다.
1. PR이 올라올 시 build test를 진행함. `build`가 실패한다면 PR을 머지 할 수 없음
2. PR은 무조건 1명 이상의 reviwer에게 `approve`를 받아야함 그렇지 않으면 PR을 머지 할 수 없음
3. PR에는 꼭 label을 붙혀야 함
4. PR은 Assignee 및 Reviewer 지정이 필수임

### Label 사용법
먼저 `Priority` 라벨은 필수적으로 설정해야합니다. 
또한 팀원들은 `Priority: High 🔥` PR이 올라왔다는 알림을 받으면 하던 작업을 최대한 빠르게 끝마치고, 해당 PR에 대한 리뷰를 진행해야합니다.

브랜치에 따라 `Feature` `Improve UX` `Refactor` `Merge` `Epic` `Bug`등의 타입을 꼭 지정해주세요


# Husky 
husky는 local git hook 사용을 도와주는 라이브러리입니다.
현재 프로젝트에는 크게 2가지 규직이 존재합니다.

## pre-commit
`pre-commit.yaml` 파일은 commit을 남기기 전 scipt를 정의합니다.

현 프로젝트에서는 `npm run lint` 를 통해 lint를 실행시키고 만약 실패 시 commit이 남지 못하게 합니다.

또한 

```yaml
current_branch=$(git branch --show-current)

restricted_branches="^(main|master|develop|epic/.+)$"

if [[ $current_branch =~ $restricted_branches ]]; then
  echo ":construction: You are on a restricted branch: $current_branch."
  echo "Commits to this branch are not allowed via pre-commit hook."
  exit 1
fi
```
을 통해 `main|master|develop|epic/` 브랜치에서의 commit을 탐지하고, 해당 브랜치에선 commit을 남길 수 없게 합니다.


## pre-push
`pre-push.yaml` 파일은 push하기 전 scipt를 정의합니다.

```yaml
current_branch=$(git branch --show-current)

restricted_branches="^(main|master|develop|epic/.+)$"

if [[ $current_branch =~ $restricted_branches ]]; then
  echo ":construction: You are on a restricted branch: $current_branch."
  echo "Commits to this branch are not allowed via pre-commit hook."
  exit 1
fi
```
을 통해 `main|master|develop|epic/` 브랜치에서의 push를 탐지하고, 해당 브랜치에선 push를 할 수 없게 합니다.


# 기본 세팅되어있는 라이브러리들

해당 프로젝트는 `Next.js page router`, `Tanstack Query`, `query-key-factory`, `axios`, `qs`, `react-hook-form`, `zod`, `tailwind`, `typescript` 등이 설치되어 있습니다. 

사용하지 않으셔도 좋지만 대부분 현업에서 굉장히 많이, 표준적으로 사용하는 셋업들이니 사용하시는 방향을 좀 더 추천드립니다. 
