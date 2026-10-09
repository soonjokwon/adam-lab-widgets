# 연구 주제 태그 검토표

논문·특허의 `topics` 칸(시트)에 들어간 태그를 주제별로 모았습니다. 제목 키워드로 **보수적으로** 자동 지정한 값이며,
틀린 태그는 시트에서 해당 행의 `topics` 칸만 고치면 됩니다(여러 개는 `;`로 구분, 예: `am; rl`).
`행` = 시트의 행 번호(1행은 머리글). 이 파일은 `python3 scripts/tag_topics.py`가 다시 만듭니다.

| ID | 칩에 보이는 이름 | 정식 이름 | 논문 | 특허 |
| --- | --- | --- | ---: | ---: |
| `cad` | CAD 모델링 | B-rep·CAD 모델링 / B-rep / CAD Modeling | 73 | 5 |
| `assembly` | 조립·메이트 | 조립·메이트 / Assembly & Mates | 26 | 2 |
| `am` | 적층제조 | 적층제조 / Additive Manufacturing | 46 | 3 |
| `kg` | 지식그래프 | 지식 그래프·온톨로지 / Knowledge Graph / Ontology | 2 | 0 |
| `llm` | LLM·생성형AI | LLM·생성형 AI / LLM / Generative AI | 7 | 1 |
| `mesh` | 메쉬·점군 | 메쉬·점군 / Mesh & Point Cloud | 13 | 0 |
| `rl` | 강화학습 | 강화학습 / Reinforcement Learning | 23 | 0 |
| `edu` | CAD 교육 | CAD 교육·자동 채점 / CAD Education / Grading | 7 | 1 |
| `design` | 제품 설계 | 제품 설계 / Product Design | 6 | 1 |
| `dt` | 디지털 트윈 | 디지털 트윈·스마트 제조 / Digital Twin / Smart Manufacturing | 5 | 0 |
| `lca` | 지속가능성 | 지속가능성·LCA / Sustainability / LCA | 14 | 1 |
| `routing` | 케이블 라우팅 | 케이블 라우팅 / Cable Routing | 12 | 0 |
| `safety` | 안전·대피 | 안전·대피 / Safety & Evacuation | 11 | 1 |
| `ship` | 조선·해양 | 조선·해양 / Shipbuilding / Ocean | 11 | 1 |
| `std` | 표준 | 표준 (ISO·STEP·AAS) / Standards (ISO·STEP·AAS) | 16 | 0 |

## CAD 모델링 (`cad`)

**논문** (73)

- 행 2 · 준비중 · Digital Twin-Oriented Simplification of CAD Assemblies Through Deep Reinforcement Learning — 함께: 조립·메이트, 강화학습, 디지털 트윈
- 행 3 · 준비중 · MPF-Net: Machining Process Classification and Feature Recognition via Multi-Task Learning
- 행 7 · IJ34 · Image2Feature: A Framework for Local Machining Feature Recognition in 3D CAD Models via Learning-Based Object Detection from 2D Images
- 행 19 · IJ22 · Simplification of 3D CAD Model in Voxel Form for Mechanical Parts Using Generative Adversarial Networks
- 행 24 · IJ17 · Feasibility study for an automated engineering change process
- 행 26 · IJ15 · Downstream Computer-Aided Design, Engineering, and Manufacturing Integration Using Exchangeable Persistent Identifiers in Neutral Re-imported Computer-Aided Design Models
- 행 27 · IJ14 · Multiobjective evolutionary optimization for feature-based simplification of 3D boundary representation models
- 행 29 · IJ12 · Feature-based translation of CAD models with macro-parametric approach: issues of feature mapping, persistent naming, and constraint translation
- 행 30 · IJ11 · Semantics-aware adaptive simplification for lightweighting diverse 3D CAD models in industrial plants
- 행 31 · IJ10 · Point-Oriented Persistent Identification of Entities for Exchanging Parametric CAD Data
- 행 32 · IJ9 · Assembly Solving for Neutral Re-Imported Product Models — 함께: 조립·메이트
- 행 33 · IJ8 · B-rep model simplification using selective and iterative volume decomposition to obtain finer multi-resolution models
- 행 34 · IJ7 · User-assisted integrated method for controlling level-of-detail of large-scale B-rep assembly models — 함께: 조립·메이트
- 행 36 · IJ5 · Determination of appropriate level of detail of a three-dimensional computer-aided design model from a permissible dissimilarity for fully automated simplification
- 행 37 · IJ4 · Feature shape complexity: a new criterion for the simplification of feature-based 3D CAD models
- 행 38 · IJ3 · Enhancement of equipment information sharing using three-dimensional computer-aided design simplification and digital catalog techniques in the plant industry
- 행 39 · IJ2 · Graph-Based Simplification of Feature-Based Three-Dimensional Computer-Aided Design Models for Preserving Connectivity
- 행 40 · IJ1 · Simplification of feature-based 3D CAD assembly data of ship and offshore plant equipment using quantitative evaluation metrics — 함께: 조립·메이트, 조선·해양
- 행 51 · KJ11 · 디지털 트윈 구축을 위한 메쉬 기반 CAD 조립품 모델 최적화에서 군집화의 적용 — 함께: 조립·메이트, 메쉬·점군, 디지털 트윈
- 행 57 · KJ5 · 허용 가능한 LOD의 상하한을 고려한 특징형상 3D CAD 조립체 모델의 단순화 — 함께: 조립·메이트
- 행 58 · KJ4 · 플랜트의 3 차원 설계를 지원하는 중립 모델 기반 카탈로그 생성 시스템 개발
- 행 60 · KJ2 · 특징형상 기반 기자재 3D CAD 조립체 데이터 간략화 시스템 개발 — 함께: 조립·메이트
- 행 61 · KJ1 · 조선해양 기자재 3D CAD 단품 데이터 간략화 시스템 개발 — 함께: 조선·해양
- 행 72 · IC17 · Levels of semantics for a 3D CAD model from the viewpoint of the simplification
- 행 73 · IC16 · Point-oriented Identification for Exchanging Parametric CAD Data
- 행 74 · IC15 · Integration of Neutral/Re-Imported Models for Assembly Update — 함께: 조립·메이트
- 행 75 · IC14 · A web-based solution for collaborative design supporting multiple CAD systems
- 행 76 · IC13 · A study on improving the shape distribution
- 행 77 · IC12 · TransCAD: A translator of history-based CAD data based on the macro-parametrics approach
- 행 78 · IC11 · A method to integrate 3D shape, specifications, and ports to create catalog data for plant 3D design
- 행 79 · IC10 · An algorithm to suggest optimal level-of-detail of a 3D CAD model for the simplification
- 행 80 · IC9 · Web-based framework for the exchange between heterogeneous procedural 3D CAD models using TransCAD and X3DOM
- 행 84 · IC5 · Connectivity-preserving Simplification of Feature-based 3D CAD Part Models
- 행 86 · IC3 · Simplification of equipment 3D CAD assembly data using quantitative metrics for prioritizing the features — 함께: 조립·메이트
- 행 87 · IC2 · Metrics to evaluate the importance of features for the simplification of equipment 3D CAD assembly data — 함께: 조립·메이트
- 행 88 · IC1 · Architecture of 3D CAD part data simplification system for ship and offshore plant equipment — 함께: 조선·해양
- 행 92 · KC102 · 비수밀 CAD 데이터의 내부 형상 제거를 위한 NeuS 가이드 하이브리드 레이캐스팅 기법
- 행 95 · KC99 · 이미지 기반 RAG-LLM을 활용한 3D CAD 모델링 명령어 추천 — 함께: LLM·생성형AI
- 행 97 · KC97 · CAD 조립품 메쉬 모델 경량화를 위한 강화학습 기반 반복적 군집화 및 단순화 방법 — 함께: 조립·메이트, 메쉬·점군, 강화학습
- 행 108 · KC86 · 객체 탐지 알고리즘을 활용한 3D CAD 모델에서 복합 및 교차 구멍 특징형상 인식
- 행 119 · KC75 · 3D CAD 모델에서 내부 국소 특징형상 탐지를 위한 단면도 활용
- 행 122 · KC72 · 그래프 신경망 적용 심층 강화학습을 활용한 3D CAD 메쉬 모델 단순화 — 함께: 메쉬·점군, 강화학습
- 행 129 · KC65 · 메쉬 기반 CAD 조립품 모델 경량화를 위한 부품 군집화를 고려한 강화학습 적용 — 함께: 조립·메이트, 메쉬·점군, 강화학습
- 행 133 · KC61 · 3D CAD 모델의 국소 특징형상 탐지를 위한 객체 인식에서 데이터 증강의 효과 분석
- 행 135 · KC59 · 멀티모달 오토인코더를 활용한 3D CAD 모델 특징 추출
- 행 140 · KC54 · 딥러닝 기반 객체 인식 알고리즘을 활용한 3D CAD 모델의 국소 특징형상 탐지
- 행 142 · KC52 · Variational Autoencoder 기반 특징 추출을 통한 3D 형상 유사도 비교
- 행 152 · KC42 · 2D 이미지의 특징점을 활용한 3D CAD 모델의 국소 형상 비교
- 행 153 · KC41 · 단면도의 형상 분산을 활용한 3D CAD 모델의 형상 유사도 비교
- 행 163 · KC31 · 대형 기기 CAD 모델의 경량화를 위한 영역 확장법의 응용
- 행 164 · KC30 · 다중 바디를 갖는 플랜트 설비 3 차원 CAD 모델의 단순화를 위한 상향식 접근법의 활용
- 행 168 · KC26 · 교환 가능한 영구 식별자를 활용한 다운 스트림 어플리케이션에서의 지속성 유지: SolidWorks 사례를 중심으로
- 행 169 · KC25 · Implementation of a Point-based Persistent Naming Method for History-based Translator TransCAD
- 행 170 · KC24 · 대용량 플랜트 설비 B-rep 모델의 점진적 LOD 조절 과정에서 조립 구조의 고려 방안 — 함께: 조립·메이트
- 행 171 · KC23 · 파라메트릭 CAD 시스템 간 교환을 위한 중립 시스템 TransCAD: 인터페이스 구현 현황
- 행 172 · KC22 · 대형기기에 대한 B-rep 기반 3D CAD 모델의 단순화 연산자
- 행 174 · KC20 · 조립체 구조를 가지는 대형기기 및 스키드 B-rep 모델의 단순화 방안 — 함께: 조립·메이트
- 행 176 · KC18 · 3D CAD 모델의 간략화를 위한 최적 LOD 수준 결정 방안
- 행 177 · KC17 · 형상 복잡도를 이용한 특징형상 기반 3D CAD 모델의 단순화
- 행 179 · KC15 · 특징형상의 델타 히스토리를 이용한 3D CAD 모델의 리비전 관리
- 행 180 · KC14 · 플랜트 유닛 수준의 대용량 3D CAD 조립체의 간략화 방안 — 함께: 조립·메이트
- 행 181 · KC13 · 플랜트 산업에서 기자재 간략화 기술의 활용
- 행 182 · KC12 · 모델 간략화를 위한 3D CAD 단품 및 조립체 데이터 추출 — 함께: 조립·메이트
- 행 183 · KC11 · 조선 해양 기자재 3D CAD 조립체 데이터의 간략화를 위한 다기준 평가 척도 — 함께: 조립·메이트, 조선·해양
- 행 184 · KC10 · 3D CAD 데이터 간략화 기술을 활용한 기자재 공급망의 지원
- 행 186 · KC8 · 플랜트 기자재 3D CAD 조립체 데이터 간략화 시스템 개발 — 함께: 조립·메이트
- 행 187 · KC7 · 기자재 카탈로그 생성을 위한 간략화된 3D CAD 데이터 저장 포맷 개발
- 행 188 · KC6 · ISO 15926 템플릿을 활용하여 표현된 플랜트 3차원 형상 데이터의 가시화 방안 — 함께: 표준
- 행 189 · KC5 · 플랜트·조선 기자재 카탈로그 구축을 위한 기자재 3차원 형상 간략화 기술 — 함께: 조선·해양
- 행 190 · KC4 · 조선해양 기자재의 조립체 3D CAD 데이터의 간략화 요구 사항 분석 — 함께: 조립·메이트, 조선·해양
- 행 191 · KC3 · 플랜트의 3차원 형상 데이터 표현을 위한 중립 모델 분석
- 행 192 · KC2 · 기자재 3D CAD 데이터 간략화 기준 개발 및 구현
- 행 193 · KC1 · 기자재 카탈로그 구축을 위한 높은 복잡도를 가지는 기자재 3D CAD 데이터의 간략화 절차

**특허** (5)

- 행 10 · P6 · 경계 표현 기반 3차원 모델 단순화 장치 및 방법
- 행 11 · P5 · 최적 정밀도 결정을 통한 모델 단순화 장치 및 방법
- 행 12 · P4 · 형상 복잡도를 이용한 모델 간략화 장치 및 방법
- 행 14 · P2 · 모델의 연결성을 보존하는 모델 간략화 장치 및 방법
- 행 15 · P1 · 조립체 모델링 데이터 간략화 장치 및 방법 — 함께: 조립·메이트

## 조립·메이트 (`assembly`)

**논문** (26)

- 행 2 · 준비중 · Digital Twin-Oriented Simplification of CAD Assemblies Through Deep Reinforcement Learning — 함께: CAD 모델링, 강화학습, 디지털 트윈
- 행 25 · IJ16 · Part decomposition and evaluation based on standard design guidelines for additive manufacturability and assemblability — 함께: 적층제조, 표준
- 행 32 · IJ9 · Assembly Solving for Neutral Re-Imported Product Models — 함께: CAD 모델링
- 행 34 · IJ7 · User-assisted integrated method for controlling level-of-detail of large-scale B-rep assembly models — 함께: CAD 모델링
- 행 40 · IJ1 · Simplification of feature-based 3D CAD assembly data of ship and offshore plant equipment using quantitative evaluation metrics — 함께: CAD 모델링, 조선·해양
- 행 51 · KJ11 · 디지털 트윈 구축을 위한 메쉬 기반 CAD 조립품 모델 최적화에서 군집화의 적용 — 함께: CAD 모델링, 메쉬·점군, 디지털 트윈
- 행 54 · KJ8 · 3D 프린팅을 활용한 모듈형 커스텀 제품의 효율적 제작을 위한 분할 자동화 및 조립 방식 연구 — 함께: 적층제조
- 행 55 · KJ7 · 3D 프린팅 공정 변수와 체결 방식에 따른 부품 간 체결 강도 비교를 위한 실험적 연구 — 함께: 적층제조
- 행 57 · KJ5 · 허용 가능한 LOD의 상하한을 고려한 특징형상 3D CAD 조립체 모델의 단순화 — 함께: CAD 모델링
- 행 60 · KJ2 · 특징형상 기반 기자재 3D CAD 조립체 데이터 간략화 시스템 개발 — 함께: CAD 모델링
- 행 74 · IC15 · Integration of Neutral/Re-Imported Models for Assembly Update — 함께: CAD 모델링
- 행 86 · IC3 · Simplification of equipment 3D CAD assembly data using quantitative metrics for prioritizing the features — 함께: CAD 모델링
- 행 87 · IC2 · Metrics to evaluate the importance of features for the simplification of equipment 3D CAD assembly data — 함께: CAD 모델링
- 행 97 · KC97 · CAD 조립품 메쉬 모델 경량화를 위한 강화학습 기반 반복적 군집화 및 단순화 방법 — 함께: CAD 모델링, 메쉬·점군, 강화학습
- 행 129 · KC65 · 메쉬 기반 CAD 조립품 모델 경량화를 위한 부품 군집화를 고려한 강화학습 적용 — 함께: CAD 모델링, 메쉬·점군, 강화학습
- 행 158 · KC36 · 3D 프린팅을 활용한 커스텀 제품의 모듈화 및 조립 방식 연구 — 함께: 적층제조
- 행 159 · KC35 · 적층 제조 효율성 향상을 위한 모델 분해 및 조립 방안 — 함께: 적층제조
- 행 161 · KC33 · 3D 프린팅 적층 조건에 따른 부품 간 체결 강도에 관한 실험적 연구 — 함께: 적층제조
- 행 162 · KC32 · 3D프린팅 된 부품의 소재와 체결 방식에 따른 체결 강도 비교를 위한 실험적 연구 — 함께: 적층제조
- 행 170 · KC24 · 대용량 플랜트 설비 B-rep 모델의 점진적 LOD 조절 과정에서 조립 구조의 고려 방안 — 함께: CAD 모델링
- 행 174 · KC20 · 조립체 구조를 가지는 대형기기 및 스키드 B-rep 모델의 단순화 방안 — 함께: CAD 모델링
- 행 180 · KC14 · 플랜트 유닛 수준의 대용량 3D CAD 조립체의 간략화 방안 — 함께: CAD 모델링
- 행 182 · KC12 · 모델 간략화를 위한 3D CAD 단품 및 조립체 데이터 추출 — 함께: CAD 모델링
- 행 183 · KC11 · 조선 해양 기자재 3D CAD 조립체 데이터의 간략화를 위한 다기준 평가 척도 — 함께: CAD 모델링, 조선·해양
- 행 186 · KC8 · 플랜트 기자재 3D CAD 조립체 데이터 간략화 시스템 개발 — 함께: CAD 모델링
- 행 190 · KC4 · 조선해양 기자재의 조립체 3D CAD 데이터의 간략화 요구 사항 분석 — 함께: CAD 모델링, 조선·해양

**특허** (2)

- 행 6 · P10 · 3D 모델링의 분할 및 모듈 조립을 통한 효율적인 3D 프린팅 방법 — 함께: 적층제조
- 행 15 · P1 · 조립체 모델링 데이터 간략화 장치 및 방법 — 함께: CAD 모델링

## 적층제조 (`am`)

**논문** (46)

- 행 4 · 준비중 · Learning to Decompose Parts for Additive Manufacturing Guided by Semantics and Printability
- 행 9 · IJ32 · Part consolidation and decomposition in redesign for additive manufacturing (RfAM): A taxonomy and review
- 행 11 · IJ30 · D-ECOmposer: Sustainable part decomposition for additive manufacturing using machine learning based life cycle assessment — 함께: 지속가능성
- 행 13 · IJ28 · Optimization of Production Scheduling for the Additive Manufacturing of Ship Models Using a Hybrid Method — 함께: 조선·해양
- 행 15 · IJ26 · Modular production of small ship models using 3D printing for model tests — 함께: 조선·해양
- 행 18 · IJ23 · Optimal process planning for hybrid additive–subtractive manufacturing using recursive volume decomposition with decision criteria
- 행 23 · IJ18 · Neural network-based build time estimation for additive manufacturing: a performance comparison
- 행 25 · IJ16 · Part decomposition and evaluation based on standard design guidelines for additive manufacturability and assemblability — 함께: 조립·메이트, 표준
- 행 45 · KJ17 · 금속 적층 제조 기반 격자 구조를 적용한 유도 미사일 조종 날개의 경량화 설계
- 행 48 · KJ14 · 적층 제조를 고려한 부품 통합 기반 승강기 권상기 받침대의 재설계
- 행 52 · KJ10 · 적층 제조 고려 설계에 기반한 연질 소재 유도탄 보호덮개 설계 및 제작
- 행 54 · KJ8 · 3D 프린팅을 활용한 모듈형 커스텀 제품의 효율적 제작을 위한 분할 자동화 및 조립 방식 연구 — 함께: 조립·메이트
- 행 55 · KJ7 · 3D 프린팅 공정 변수와 체결 방식에 따른 부품 간 체결 강도 비교를 위한 실험적 연구 — 함께: 조립·메이트
- 행 63 · IC26 · Semantic-Aware Part Decomposition for Additive Manufacturing via Reinforcement Learning — 함께: 강화학습
- 행 67 · IC22 · Reducing the Environmental Impact in Additive Manufacturing Through Part Decomposition Based on Lifecycle Assessment — 함께: 지속가능성
- 행 91 · KC103 · 적층 제조를 고려한 강화학습 기반 부품 분할에서 단일 루프 평면 절단 알고리즘의 영향 분석 — 함께: 강화학습
- 행 93 · KC101 · 강화학습을 활용한 적층 제조를 위한 의미론적 부품 분할 — 함께: 강화학습
- 행 101 · KC93 · 금속 적층 제조 기반 미사일 조종 날개 제조 공정 시뮬레이션
- 행 102 · KC92 · 적층 제조를 고려한 강화학습 기반 부품 분할 — 함께: 강화학습
- 행 103 · KC91 · 금속 적층 제조 기반 유도 미사일 조종 날개 경량화를 위한 격자 구조 적용 및 최적화
- 행 107 · KC87 · 금속 적층 제조 기반 유도 미사일 조종 날개의 최적 격자 구조 선정
- 행 109 · KC85 · 금속 3D 프린팅 기반 유도 미사일 조종 날개의 경량화 및 성능 개선을 위한 격자구조 적용
- 행 111 · KC83 · 아라미드 나노섬유의 금속 적층제조 표면 코팅 적용 평가
- 행 116 · KC78 · 기계 학습 기반 노즐 경로 보정을 통한 FFF 3D 프린팅 표면 품질 향상
- 행 126 · KC68 · 적층 제조 적합 부품 식별을 위한 기준 및 절차 수립
- 행 127 · KC67 · 적층 제조에서 재활용성을 고려한 최적 부품 분할 및 병합 방법 — 함께: 지속가능성
- 행 132 · KC62 · 지속가능한 적층 제조를 위한 최적 모듈 분할 — 함께: 지속가능성
- 행 136 · KC58 · FDM 3D 프린팅 출력 품질 향상을 위한 기계학습 기반 노즐 위치 예측
- 행 137 · KC57 · 적층 제조의 탄소 배출량 예측을 위한 심층 신경망 활용 — 함께: 지속가능성
- 행 138 · KC56 · 3D 프린팅 품질 및 상태 관찰을 위한 웹 기반 디지털 트윈 구현 — 함께: 디지털 트윈
- 행 141 · KC53 · 적층 제조에서 인공 신경망을 활용한 전생애주기평가 기반 환경 영향 예측 — 함께: 지속가능성
- 행 145 · KC49 · 적층 제조에서 설계 및 제조 정보 기반 전생애주기평가 도구 개발 — 함께: 지속가능성
- 행 146 · KC48 · 3D 프린팅을 위한 커스텀 제품의 최적 모듈화
- 행 150 · KC44 · 3D 프린팅 기반 커스텀 제품의 분할 최적화
- 행 151 · KC43 · 적층 제조를 위한 부품 병합 연구 동향 분석
- 행 154 · KC40 · 적층 제조 특화 설계에 기반한 유도탄 보호 덮개의 설계
- 행 155 · KC39 · 연질 소재의 3차원 프린팅 및 유도탄 탐색기 보호 구조에의 적용 방안에 관한연구
- 행 157 · KC37 · 3D프린팅을 활용한 커스텀 제품의 효율적 제작을 위한 모델 분할 소프트웨어 개발
- 행 158 · KC36 · 3D 프린팅을 활용한 커스텀 제품의 모듈화 및 조립 방식 연구 — 함께: 조립·메이트
- 행 159 · KC35 · 적층 제조 효율성 향상을 위한 모델 분해 및 조립 방안 — 함께: 조립·메이트
- 행 160 · KC34 · 3D프린팅을 활용한 모듈 기반의 경제적 모형선 제작 방법론 제안 — 함께: 조선·해양
- 행 161 · KC33 · 3D 프린팅 적층 조건에 따른 부품 간 체결 강도에 관한 실험적 연구 — 함께: 조립·메이트
- 행 162 · KC32 · 3D프린팅 된 부품의 소재와 체결 방식에 따른 체결 강도 비교를 위한 실험적 연구 — 함께: 조립·메이트
- 행 165 · KC29 · 3D 프린팅에서 제조성을 고려한 부품 분해 요구사항
- 행 166 · KC28 · 3D 프린팅에서 출력 시간 예측을 위한 신경망의 활용
- 행 167 · KC27 · 효율적인 3D 프린팅을 위한 부품 분해 최적화

**특허** (3)

- 행 4 · P12 · 컴퓨터에 의해 수행되는 삼차원 모델 파일을 이용하여 적층제조 시 탄소 배출량을 예측하는 방법 — 함께: 지속가능성
- 행 6 · P10 · 3D 모델링의 분할 및 모듈 조립을 통한 효율적인 3D 프린팅 방법 — 함께: 조립·메이트
- 행 9 · P7 · 3D 프린팅을 이용한 연질 소재의 유도탄 보호 덮개

## 지식그래프 (`kg`)

**논문** (2)

- 행 22 · IJ19 · A New Implementation of OntoSTEP: Flexible Generation of Ontology and Knowledge Graphs of EXPRESS-Driven Data — 함께: 표준
- 행 28 · IJ13 · Enriching standards-based digital thread by fusing as-designed and as-inspected data using knowledge graphs — 함께: 디지털 트윈, 표준

## LLM·생성형AI (`llm`)

**논문** (7)

- 행 62 · IC27 · Leveraging Large Language Model for Sustainable Manufacturing Process Recommendation — 함께: 지속가능성
- 행 89 · KC105 · 3차원 모델 기반 적합 제조 공정 선택을 위한 멀티 에이전트 LLM의 활용
- 행 95 · KC99 · 이미지 기반 RAG-LLM을 활용한 3D CAD 모델링 명령어 추천 — 함께: CAD 모델링
- 행 98 · KC96 · 기계 학습 및 LLM 기반 지속가능 제조 공정 추천 프레임워크 — 함께: 지속가능성
- 행 99 · KC95 · CADviser: RAG-LLM을 활용한 3D CAD 모델링 교육용 맞춤형 피드백 시스템 개발 — 함께: CAD 교육
- 행 113 · KC81 · 설명 가능한 적정 제조 방식 추천을 위한 LLM의 활용
- 행 114 · KC80 · LLM을 활용한 3D CAD 모델링 교육용 맞춤형 피드백 생성 — 함께: CAD 교육

**특허** (1)

- 행 2 · P14 · 삼차원 설계 데이터를 활용한 생성형 인공지능 모델 기반의 제조공정 추천 시스템 및 이를 이용한 제조공정 추천방법

## 메쉬·점군 (`mesh`)

**논문** (13)

- 행 6 · 준비중 · Recovering Simplified Meshes: A Backpropagation-Driven Surface Mesh Optimization with Differentiable Renderers
- 행 12 · IJ29 · Denoise yourself: Self-supervised point cloud upsampling with pretrained denoising
- 행 16 · IJ25 · Deep learning-based point cloud upsampling: a review of recent trends
- 행 17 · IJ24 · Point cloud upsampling using deep self-sampling with point saliency
- 행 50 · KJ12 · 간략화 메쉬의 품질 향상을 위한 역전파 기반 최적화 방법
- 행 51 · KJ11 · 디지털 트윈 구축을 위한 메쉬 기반 CAD 조립품 모델 최적화에서 군집화의 적용 — 함께: CAD 모델링, 조립·메이트, 디지털 트윈
- 행 68 · IC21 · Saliency-Aware Point Cloud Upsampling Approach for Edge Consolidation
- 행 97 · KC97 · CAD 조립품 메쉬 모델 경량화를 위한 강화학습 기반 반복적 군집화 및 단순화 방법 — 함께: CAD 모델링, 조립·메이트, 강화학습
- 행 121 · KC73 · 점군 업샘플링을 위한 자기 지도학습 적용
- 행 122 · KC72 · 그래프 신경망 적용 심층 강화학습을 활용한 3D CAD 메쉬 모델 단순화 — 함께: CAD 모델링, 강화학습
- 행 129 · KC65 · 메쉬 기반 CAD 조립품 모델 경량화를 위한 부품 군집화를 고려한 강화학습 적용 — 함께: CAD 모델링, 조립·메이트, 강화학습
- 행 130 · KC64 · 3차원 점군 특징 추출을 위한 오토인코더 방법론 비교 분석
- 행 144 · KC50 · 미분 가능한 샘플링과 점군-메쉬 거리를 활용한 QEM 간략화 메쉬의 원본 형상 복원 기법

## 강화학습 (`rl`)

**논문** (23)

- 행 2 · 준비중 · Digital Twin-Oriented Simplification of CAD Assemblies Through Deep Reinforcement Learning — 함께: CAD 모델링, 조립·메이트, 디지털 트윈
- 행 5 · 준비중 · Knowledge-Guided Reinforcement Learning for Interference Validation in Early-Stage Industrial Design
- 행 8 · IJ33 · Reinforcement learning-based dynamic evacuation guidance for fire emergencies: Toward safety digital twins — 함께: 디지털 트윈, 안전·대피
- 행 47 · KJ15 · 심층 강화학습을 활용한 3D 전기 패널의 자동 케이블 라우팅 — 함께: 케이블 라우팅
- 행 63 · IC26 · Semantic-Aware Part Decomposition for Additive Manufacturing via Reinforcement Learning — 함께: 적층제조
- 행 64 · IC25 · Deep Reinforcement Learning-Based Pathfinding for Cable Auto-Routing — 함께: 케이블 라우팅
- 행 90 · KC104 · 산업 디자인 초기 단계에서의 간섭 검증을 위한 지식 기반 강화 학습
- 행 91 · KC103 · 적층 제조를 고려한 강화학습 기반 부품 분할에서 단일 루프 평면 절단 알고리즘의 영향 분석 — 함께: 적층제조
- 행 93 · KC101 · 강화학습을 활용한 적층 제조를 위한 의미론적 부품 분할 — 함께: 적층제조
- 행 96 · KC98 · 디자이너와 엔지니어의 협업 지원을 위한 강화학습 기반 부품 간섭 검증
- 행 97 · KC97 · CAD 조립품 메쉬 모델 경량화를 위한 강화학습 기반 반복적 군집화 및 단순화 방법 — 함께: CAD 모델링, 조립·메이트, 메쉬·점군
- 행 102 · KC92 · 적층 제조를 고려한 강화학습 기반 부품 분할 — 함께: 적층제조
- 행 106 · KC88 · 화재 확산과 군중 행동을 고려한 강화학습 기반 대피 보조 에이전트 개발 — 함께: 안전·대피
- 행 110 · KC84 · 강화학습 기반 자동 케이블 라우팅에서 모방학습의 적용 — 함께: 케이블 라우팅
- 행 112 · KC82 · 커리큘럼 학습 기반 강화학습을 적용한 케이블 자동 라우팅을 위한 경로 계획 — 함께: 케이블 라우팅
- 행 120 · KC74 · 화재 대피 시뮬레이션에서 강화학습 기반 탈출 보조 에이전트의 효과 분석 — 함께: 안전·대피
- 행 122 · KC72 · 그래프 신경망 적용 심층 강화학습을 활용한 3D CAD 메쉬 모델 단순화 — 함께: CAD 모델링, 메쉬·점군
- 행 123 · KC71 · 멀티 에이전트 강화학습 기반 케이블 라우팅 최적화 — 함께: 케이블 라우팅
- 행 124 · KC70 · 3차원 길찾기를 위한 심층 강화학습에서 합성곱 신경망의 적용
- 행 128 · KC66 · 케이블 자동 라우팅을 위한 다중 에이전트 기반 강화학습 적용 — 함께: 케이블 라우팅
- 행 129 · KC65 · 메쉬 기반 CAD 조립품 모델 경량화를 위한 부품 군집화를 고려한 강화학습 적용 — 함께: CAD 모델링, 조립·메이트, 메쉬·점군
- 행 131 · KC63 · 케이블 자동 라우팅을 위한 강화학습 기반 최적 케이블 형상 생성 방안 — 함께: 케이블 라우팅
- 행 134 · KC60 · 케이블 자동 라우팅을 위한 3차원 길찾기 문제에서 심층 강화학습의 적용 — 함께: 케이블 라우팅

## CAD 교육 (`edu`)

**논문** (7)

- 행 10 · IJ31 · CADuBoost: Enhancing Education in Mechanical 3D CAD Modeling Through Automated Grading and Feedback System
- 행 49 · KJ13 · 기계 공학에서 3D CAD 모델링 교육을 위한 자동 채점 시스템 개발
- 행 69 · IC20 · Requirement Analysis for the Automatic Assessment of 3D Drawings in Mechanical Engineering Education
- 행 99 · KC95 · CADviser: RAG-LLM을 활용한 3D CAD 모델링 교육용 맞춤형 피드백 시스템 개발 — 함께: LLM·생성형AI
- 행 114 · KC80 · LLM을 활용한 3D CAD 모델링 교육용 맞춤형 피드백 생성 — 함께: LLM·생성형AI
- 행 125 · KC69 · 기계 3D CAD 모델링 교육을 위한 웹 기반 피드백 시스템 개발
- 행 147 · KC47 · 3D CAD 자동 채점 및 피드백 소프트웨어 개발

**특허** (1)

- 행 7 · P9 · 삼차원 캐드 모델링 교육을 위한 자동 채점 및 피드백 방법

## 제품 설계 (`design`)

**논문** (6)

- 행 43 · KJ19 · 신발장 걸이형 접이식 의자의 설계 및 제작 연구: 공간 활용도 및 착화 편의성 개선을 중심으로
- 행 46 · KJ16 · 오리가미를 적용한 미래 모빌리티용 다기능 탁자 설계
- 행 94 · KC100 · 신발장 걸이형 접이식 의자의 설계 및 제작 연구: 공간 활용도 및 착화 편의성 개선을 중심으로
- 행 117 · KC77 · 손 이미지 기반 맞춤형 마우스 모델 자동 생성에서 3D 그립 방식 추천을 위한 인공신경망의 활용
- 행 118 · KC76 · 오리가미를 적용한 미래 모빌리티용 다기능 탁자 설계
- 행 139 · KC55 · 이미지로부터 추출한 손 치수를 활용한 커스텀 마우스의 3D 모델 생성

**특허** (1)

- 행 5 · P11 · 손 이미지를 이용하여 사용자 맞춤형 마우스를 제조하기 위한 3차원 모델링 생성방법

## 디지털 트윈 (`dt`)

**논문** (5)

- 행 2 · 준비중 · Digital Twin-Oriented Simplification of CAD Assemblies Through Deep Reinforcement Learning — 함께: CAD 모델링, 조립·메이트, 강화학습
- 행 8 · IJ33 · Reinforcement learning-based dynamic evacuation guidance for fire emergencies: Toward safety digital twins — 함께: 강화학습, 안전·대피
- 행 28 · IJ13 · Enriching standards-based digital thread by fusing as-designed and as-inspected data using knowledge graphs — 함께: 지식그래프, 표준
- 행 51 · KJ11 · 디지털 트윈 구축을 위한 메쉬 기반 CAD 조립품 모델 최적화에서 군집화의 적용 — 함께: CAD 모델링, 조립·메이트, 메쉬·점군
- 행 138 · KC56 · 3D 프린팅 품질 및 상태 관찰을 위한 웹 기반 디지털 트윈 구현 — 함께: 적층제조

## 지속가능성 (`lca`)

**논문** (14)

- 행 11 · IJ30 · D-ECOmposer: Sustainable part decomposition for additive manufacturing using machine learning based life cycle assessment — 함께: 적층제조
- 행 41 · KJ21 · 기계 학습 기반 전과정평가를 활용한 사출성형 부품의 탄소발자국 예측
- 행 62 · IC27 · Leveraging Large Language Model for Sustainable Manufacturing Process Recommendation — 함께: LLM·생성형AI
- 행 65 · IC24 · AI-Driven Framework for Sustainable Manufacturing Process Selection
- 행 66 · IC23 · A Review of Lifecycle Assessment (LCA) Cases in the Shipbuilding Industry — 함께: 조선·해양
- 행 67 · IC22 · Reducing the Environmental Impact in Additive Manufacturing Through Part Decomposition Based on Lifecycle Assessment — 함께: 적층제조
- 행 70 · IC19 · Standardizing environmental performance evaluation of manufacturing systems through ISO 20140 — 함께: 표준
- 행 71 · IC18 · An automated workflow for integrating environmental sustainability assessment into parametric part design through standard reference models — 함께: 표준
- 행 98 · KC96 · 기계 학습 및 LLM 기반 지속가능 제조 공정 추천 프레임워크 — 함께: LLM·생성형AI
- 행 127 · KC67 · 적층 제조에서 재활용성을 고려한 최적 부품 분할 및 병합 방법 — 함께: 적층제조
- 행 132 · KC62 · 지속가능한 적층 제조를 위한 최적 모듈 분할 — 함께: 적층제조
- 행 137 · KC57 · 적층 제조의 탄소 배출량 예측을 위한 심층 신경망 활용 — 함께: 적층제조
- 행 141 · KC53 · 적층 제조에서 인공 신경망을 활용한 전생애주기평가 기반 환경 영향 예측 — 함께: 적층제조
- 행 145 · KC49 · 적층 제조에서 설계 및 제조 정보 기반 전생애주기평가 도구 개발 — 함께: 적층제조

**특허** (1)

- 행 4 · P12 · 컴퓨터에 의해 수행되는 삼차원 모델 파일을 이용하여 적층제조 시 탄소 배출량을 예측하는 방법 — 함께: 적층제조

## 케이블 라우팅 (`routing`)

**논문** (12)

- 행 14 · IJ27 · Automatic cable routing based on improved pathfinding algorithm and B-spline optimization for collision avoidance
- 행 47 · KJ15 · 심층 강화학습을 활용한 3D 전기 패널의 자동 케이블 라우팅 — 함께: 강화학습
- 행 64 · IC25 · Deep Reinforcement Learning-Based Pathfinding for Cable Auto-Routing — 함께: 강화학습
- 행 110 · KC84 · 강화학습 기반 자동 케이블 라우팅에서 모방학습의 적용 — 함께: 강화학습
- 행 112 · KC82 · 커리큘럼 학습 기반 강화학습을 적용한 케이블 자동 라우팅을 위한 경로 계획 — 함께: 강화학습
- 행 123 · KC71 · 멀티 에이전트 강화학습 기반 케이블 라우팅 최적화 — 함께: 강화학습
- 행 128 · KC66 · 케이블 자동 라우팅을 위한 다중 에이전트 기반 강화학습 적용 — 함께: 강화학습
- 행 131 · KC63 · 케이블 자동 라우팅을 위한 강화학습 기반 최적 케이블 형상 생성 방안 — 함께: 강화학습
- 행 134 · KC60 · 케이블 자동 라우팅을 위한 3차원 길찾기 문제에서 심층 강화학습의 적용 — 함께: 강화학습
- 행 143 · KC51 · 케이블 자동 라우팅에서 곡률과 장애물 충돌을 고려한 B-Spline 보간 방법
- 행 148 · KC46 · 케이블 자동 라우팅을 위한 길찾기 알고리즘 및 B-Spline 적용
- 행 149 · KC45 · 케이블 자동 라우팅을 위한 최단 거리 알고리즘 비교

## 안전·대피 (`safety`)

**논문** (11)

- 행 8 · IJ33 · Reinforcement learning-based dynamic evacuation guidance for fire emergencies: Toward safety digital twins — 함께: 강화학습, 디지털 트윈
- 행 20 · IJ21 · Evacuation analysis of a passenger ship with an inclined passage considering the coupled effect of trim and heel — 함께: 조선·해양
- 행 42 · KJ20 · 열차 무정차 통과는 역사 군중 밀집을 얼마나 완화하는가: 10·29 참사 당일 이태원역의 시뮬레이션 기반 재구성과 정량 평가
- 행 44 · KJ18 · AI 기반 산업 기계 끼임 사고 위험도 평가 시스템
- 행 53 · KJ9 · 군중 밀집 위험도 시뮬레이션 기반의 인파 관리 안전대책 수립
- 행 56 · KJ6 · 인간의 체력을 반영한 초고층 빌딩 대피 시뮬레이션
- 행 100 · KC94 · 산업 현장 안전성 향상을 위한 AI 기반 산업 기계 끼임 사고 위험도 평가 시스템
- 행 106 · KC88 · 화재 확산과 군중 행동을 고려한 강화학습 기반 대피 보조 에이전트 개발 — 함께: 강화학습
- 행 115 · KC79 · 산업 기계 끼임 사고 예방을 위한 AI 카메라 기반 안전 관리
- 행 120 · KC74 · 화재 대피 시뮬레이션에서 강화학습 기반 탈출 보조 에이전트의 효과 분석 — 함께: 강화학습
- 행 156 · KC38 · 증강현실 기반 실내 화재 대피 내비게이션 시스템 개발

**특허** (1)

- 행 3 · P13 · 화재 발생 시 재실자의 탈출을 보조하는 시스템

## 조선·해양 (`ship`)

**논문** (11)

- 행 13 · IJ28 · Optimization of Production Scheduling for the Additive Manufacturing of Ship Models Using a Hybrid Method — 함께: 적층제조
- 행 15 · IJ26 · Modular production of small ship models using 3D printing for model tests — 함께: 적층제조
- 행 20 · IJ21 · Evacuation analysis of a passenger ship with an inclined passage considering the coupled effect of trim and heel — 함께: 안전·대피
- 행 40 · IJ1 · Simplification of feature-based 3D CAD assembly data of ship and offshore plant equipment using quantitative evaluation metrics — 함께: CAD 모델링, 조립·메이트
- 행 61 · KJ1 · 조선해양 기자재 3D CAD 단품 데이터 간략화 시스템 개발 — 함께: CAD 모델링
- 행 66 · IC23 · A Review of Lifecycle Assessment (LCA) Cases in the Shipbuilding Industry — 함께: 지속가능성
- 행 88 · IC1 · Architecture of 3D CAD part data simplification system for ship and offshore plant equipment — 함께: CAD 모델링
- 행 160 · KC34 · 3D프린팅을 활용한 모듈 기반의 경제적 모형선 제작 방법론 제안 — 함께: 적층제조
- 행 183 · KC11 · 조선 해양 기자재 3D CAD 조립체 데이터의 간략화를 위한 다기준 평가 척도 — 함께: CAD 모델링, 조립·메이트
- 행 189 · KC5 · 플랜트·조선 기자재 카탈로그 구축을 위한 기자재 3차원 형상 간략화 기술 — 함께: CAD 모델링
- 행 190 · KC4 · 조선해양 기자재의 조립체 3D CAD 데이터의 간략화 요구 사항 분석 — 함께: CAD 모델링, 조립·메이트

**특허** (1)

- 행 8 · P8 · 선체 거동특성 시험용 장치

## 표준 (`std`)

**논문** (16)

- 행 21 · IJ20 · Visualizing Standardized Model-based Design and Inspection Data in Augmented Reality
- 행 22 · IJ19 · A New Implementation of OntoSTEP: Flexible Generation of Ontology and Knowledge Graphs of EXPRESS-Driven Data — 함께: 지식그래프
- 행 25 · IJ16 · Part decomposition and evaluation based on standard design guidelines for additive manufacturability and assemblability — 함께: 조립·메이트, 적층제조
- 행 28 · IJ13 · Enriching standards-based digital thread by fusing as-designed and as-inspected data using knowledge graphs — 함께: 지식그래프, 디지털 트윈
- 행 35 · IJ6 · Standardized exchange of plant equipment and materials data based on ISO 15926 methodology in nuclear power plants
- 행 59 · KJ3 · iRINGTools를 활용한 ISO 15926 기반 기자재 참조 데이터 서버의 구축과 활용
- 행 70 · IC19 · Standardizing environmental performance evaluation of manufacturing systems through ISO 20140 — 함께: 지속가능성
- 행 71 · IC18 · An automated workflow for integrating environmental sustainability assessment into parametric part design through standard reference models — 함께: 지속가능성
- 행 81 · IC8 · Exchange of equipment and materials' specifications data using iRINGTools for nuclear power plants
- 행 82 · IC7 · Equipment Data Management of Korean Nuclear Power Plant based on Standard Handover Specification with Class Mapping
- 행 83 · IC6 · Extension of Equipment Classifications based on Property Sets and ISO Standards in Nuclear Industry
- 행 85 · IC4 · A Study on Plant Life Cycle Information Management using Information Model and Reference Data Library
- 행 173 · KC21 · 원자력 발전소의 효과적인 설비 BOM 관리를 위한 자재 참조 데이터 라이브러리 구축
- 행 175 · KC19 · 핸드오버 표준화 CFIHOS와 그 응용
- 행 185 · KC9 · 원전 생애주기 정보 관리를 위한 원자력 발전소 분류체계 및 국제 표준 기반 참조 데이터 라이브러리의 구축에 관한 연구
- 행 188 · KC6 · ISO 15926 템플릿을 활용하여 표현된 플랜트 3차원 형상 데이터의 가시화 방안 — 함께: CAD 모델링

## 태그 없음

**논문** (3)

- 행 104 · KC90 · 고내구성 아라미드 나노섬유 구조화 기술 및 응용
- 행 105 · KC89 · AI 기반 플라스틱 사출성형 공정의 견적 예측 모델 개발
- 행 178 · KC16 · 원자력발전소 기자재 라이브러리 구성을 위한 속성 값 기반 분류체계 확장

**특허** (1)

- 행 13 · P3 · 기자재 정보 공유 시스템 및 방법

