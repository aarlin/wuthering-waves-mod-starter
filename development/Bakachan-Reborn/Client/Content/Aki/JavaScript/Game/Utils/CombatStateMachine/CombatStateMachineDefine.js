"use strict";
var Fsm;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Fsm = void 0),
	(function (t) {
		(t.Task = class {
			constructor() {
				(this.Type = 0), (this.CanBeInterrupt = !1), (this.Name = void 0);
			}
		}),
			(t.TaskSkill = class {
				constructor() {
					this.SkillId = 0;
				}
			}),
			(t.TaskSkillByName = class {
				constructor() {
					this.SkillName = "";
				}
			}),
			(t.TaskRandomMontage = class {
				constructor() {
					(this.MontageNames = void 0),
						(this.HideOnLoading = !1),
						(this.BlendInTime = 0);
				}
			}),
			(t.TaskLeaveFight = class {
				constructor() {
					(this.BlinkTime = 0),
						(this.MaxStopTime = 0),
						(this.UsePatrolPointPriority = !1);
				}
			}),
			(t.TaskMontage = class {
				constructor() {
					(this.MontageName = ""),
						(this.HideOnLoading = !1),
						(this.BlendInTime = 0);
				}
			}),
			(t.TaskMoveToTarget = class {
				constructor() {
					(this.MoveState = 0),
						(this.NavigationOn = !1),
						(this.EndDistance = 0),
						(this.TurnSpeed = 0),
						(this.FixPeriod = 0),
						(this.WalkOff = !1);
				}
			}),
			(t.TaskPatrol = class {
				constructor() {
					(this.MoveState = 0), (this.OpenDebugMode = !1);
				}
			}),
			(t.Action = class {
				constructor() {
					(this.Type = 0), (this.Name = void 0);
				}
			}),
			(t.ActionAddBuff = class {
				constructor() {
					this.BuffId = 0;
				}
			}),
			(t.ActionRemoveBuff = class {
				constructor() {
					this.BuffId = 0;
				}
			}),
			(t.ActionCastSkill = class {
				constructor() {
					this.SkillId = 0;
				}
			}),
			(t.ActionCancelSkill = class {
				constructor() {
					this.SkillId = 0;
				}
			}),
			(t.ActionResetStatus = class {}),
			(t.ActionEnterFight = class {}),
			(t.ActionCastSkillByName = class {
				constructor() {
					this.SkillName = "";
				}
			}),
			(t.ActionCancelSkillByName = class {
				constructor() {
					this.SkillName = "";
				}
			}),
			(t.ActionInstChangeStateTag = class {
				constructor() {
					this.TagId = 0;
				}
			}),
			(t.ActionResetPart = class {
				constructor() {
					(this.PartName = ""),
						(this.ResetActivate = !1),
						(this.ResetLife = !1);
				}
			}),
			(t.ActionActivatePart = class {
				constructor() {
					(this.PartName = ""), (this.Activate = !1);
				}
			}),
			(t.ActionActivateSkillGroup = class {
				constructor() {
					(this.ConfigId = 0), (this.Activate = !1);
				}
			}),
			(t.ActionDispatchEvent = class {
				constructor() {
					this.Event = "";
				}
			}),
			(t.ActionCue = class {
				constructor() {
					this.CueIds = void 0;
				}
			}),
			(t.ActionStopMontage = class {}),
			(t.State = class {
				constructor() {
					(this.Type = 0), (this.Name = void 0);
				}
			}),
			(t.BindBuff = class {
				constructor() {
					this.BuffId = 0;
				}
			}),
			(t.BindSkill = class {
				constructor() {
					this.SkillId = 0;
				}
			}),
			(t.BindTag = class {
				constructor() {
					this.TagId = 0;
				}
			}),
			(t.BindSkillByName = class {
				constructor() {
					this.SkillName = "";
				}
			}),
			(t.BindSkillCounter = class {
				constructor() {
					(this.SkillIds = void 0),
						(this.BlackboardKey = ""),
						(this.AddValueMin = 0),
						(this.AddValueMax = 0),
						(this.Reset = !1);
				}
			}),
			(t.BindActivateSkillGroup = class {
				constructor() {
					this.ConfigId = 0;
				}
			}),
			(t.BindAiHateConfig = class {
				constructor() {
					this.ConfigId = 0;
				}
			}),
			(t.BindAiSenseEnable = class {
				constructor() {
					this.ConfigId = 0;
				}
			}),
			(t.BindCue = class {
				constructor() {
					(this.CueIds = void 0), (this.HideOnLoading = !1);
				}
			}),
			(t.BindDisableActor = class {}),
			(t.BindLeaveFight = class {
				constructor() {
					(this.RandomRadius = 0),
						(this.MinWanderDistance = 0),
						(this.MaxNavigationMillisecond = 0),
						(this.MoveStateForWanderOrReset = !1),
						(this.MaxStopTime = 0),
						(this.BlinkTime = 0),
						(this.UsePatrolPointPriority = !1);
				}
			}),
			(t.BindMontage = class {
				constructor() {
					(this.MontageName = ""), (this.HideOnLoading = !1);
				}
			}),
			(t.BindBoneVisible = class {
				constructor() {
					(this.BoneName = ""), (this.Visible = !1);
				}
			}),
			(t.BindMeshVisible = class {
				constructor() {
					(this.Tag = ""), (this.Visible = !1), (this.PropagateToChildren = !1);
				}
			}),
			(t.BindBoneCollision = class {
				constructor() {
					(this.BoneName = ""),
						(this.IsBlockPawn = !1),
						(this.IsBulletDetect = !1),
						(this.IsBlockCamera = !1),
						(this.IsBlockPawnOnExit = !1),
						(this.IsBulletDetectOnExit = !1),
						(this.IsBlockCameraOnExit = !1);
				}
			}),
			(t.BindPartPanelVisible = class {
				constructor() {
					(this.PartName = ""), (this.Visible = !1);
				}
			}),
			(t.BindDeathMontage = class {
				constructor() {
					(this.DeathType = 0), (this.MontageName = "");
				}
			}),
			(t.BindPalsy = class {
				constructor() {
					(this.CounterAttackEffect = ""), (this.CounterAttackCamera = "");
				}
			}),
			(t.BindCollisionChannel = class {
				constructor() {
					this.IgnoreChannels = void 0;
				}
			}),
			(t.BindDisableCollision = class {}),
			(t.Condition = class {
				constructor() {
					(this.Type = 0),
						(this.Reverse = !1),
						(this.Index = 0),
						(this.Name = void 0);
				}
			}),
			(t.CondAnd = class {
				constructor() {
					this.Conditions = void 0;
				}
			}),
			(t.CondOr = class {
				constructor() {
					this.Conditions = void 0;
				}
			}),
			(t.CondTrue = class {}),
			(t.CondHpLessThan = class {
				constructor() {
					this.HpRatio = 0;
				}
			}),
			(t.CondSkillEnd = class {}),
			(t.CondTag = class {
				constructor() {
					(this.TagId = 0), (this.TagName = "");
				}
			}),
			(t.CondBBValueCompare = class {
				constructor() {
					(this.Key1 = 0), (this.Key2 = 0), (this.Compare = 0);
				}
			}),
			(t.CondAttrCompare = class {
				constructor() {
					(this.Attr1 = 0), (this.Attr2 = 0), (this.Compare = 0);
				}
			}),
			(t.CondAttribute = class {
				constructor() {
					(this.AttributeId = 0), (this.Min = 0), (this.Max = 0);
				}
			}),
			(t.CondAttributeRate = class {
				constructor() {
					(this.AttributeId = 0),
						(this.Denominator = 0),
						(this.Min = 0),
						(this.Max = 0);
				}
			}),
			(t.CondCheckState = class {
				constructor() {
					this.TargetState = 0;
				}
			}),
			(t.CondHate = class {}),
			(t.CondListenLeaveFight = class {}),
			(t.CondTimer = class {
				constructor() {
					(this.MinTime = 0), (this.MaxTime = 0);
				}
			}),
			(t.CondWaitClient = class {}),
			(t.CondCheckStateByName = class {
				constructor() {
					this.TargetStateName = "";
				}
			}),
			(t.CondInstStateChange = class {
				constructor() {
					this.TagId = 0;
				}
			}),
			(t.CondBuffStack = class {
				constructor() {
					(this.BuffId = 0), (this.MinStack = 0), (this.MaxStack = 0);
				}
			}),
			(t.CondPartLife = class {
				constructor() {
					(this.PartName = ""),
						(this.CheckRate = !1),
						(this.Min = 0),
						(this.Max = 0);
				}
			}),
			(t.CondCheckPartActivated = class {
				constructor() {
					this.PartName = "";
				}
			}),
			(t.CondListenEvent = class {
				constructor() {
					this.Event = "";
				}
			}),
			(t.CondTaskFinish = class {}),
			(t.CondMontageTimeRemaining = class {
				constructor() {
					this.Time = 0;
				}
			}),
			(t.CondListenBeHit = class {
				constructor() {
					(this.NoHitAnimation = !1),
						(this.SoftKnock = !1),
						(this.HeavyKnock = !1),
						(this.KnockUp = !1),
						(this.KnockDown = !1),
						(this.Parry = !1),
						(this.VisionCounterAttackId = 0);
				}
			}),
			(t.Transition = class {
				constructor() {
					(this.From = 0),
						(this.To = 0),
						(this.TransitionPredictionType = void 0),
						(this.Weight = 0),
						(this.Conditions = void 0);
				}
			}),
			(t.Node = class {
				constructor() {
					(this.Uuid = 0),
						(this.ReferenceUuid = void 0),
						(this.OverrideCommonUuid = void 0),
						(this.Name = ""),
						(this.TakeControlType = 0),
						(this.TransitionRule = 0);
				}
			}),
			(t.StateMachineGroup = class {
				constructor() {
					(this.Version = void 0),
						(this.StateMachines = void 0),
						(this.Nodes = void 0);
				}
			});
	})((Fsm = exports.Fsm || (exports.Fsm = {})));
