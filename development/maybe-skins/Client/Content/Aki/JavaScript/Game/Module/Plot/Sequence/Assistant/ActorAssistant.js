"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActorAssistant = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Info_1 = require("../../../../../Core/Common/Info"),
	Log_1 = require("../../../../../Core/Common/Log"),
	PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	Global_1 = require("../../../../Global"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterBuffIds_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
	WorldFunctionLibrary_1 = require("../../../../World/Bridge/WorldFunctionLibrary"),
	WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask"),
	LoginDefine_1 = require("../../../Login/Data/LoginDefine"),
	PhantomUtil_1 = require("../../../Phantom/PhantomUtil"),
	PlotAudioModel_1 = require("../../PlotAudioModel"),
	PlotController_1 = require("../../PlotController"),
	SequenceDefine_1 = require("../SequenceDefine"),
	SeqBaseAssistant_1 = require("./SeqBaseAssistant"),
	BindingActorAnimBlendOutTime = 0.2,
	MaxPos = -999999,
	HidePos = new UE.Vector(0, 0, MaxPos);
class ActorAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
	constructor() {
		super(...arguments),
			(this.Xeo = void 0),
			(this.$eo = void 0),
			(this.Yeo = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.Jeo = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.zeo = void 0),
			(this.Zeo = void 0),
			(this.PreLoadMouthAssetName = new Array()),
			(this.CurLoadMouthIndex = 0),
			(this.PreLoadMouthAssetMap = new Map()),
			(this.eto = void 0),
			(this.w7s = !1);
	}
	Load(e) {
		this.tto(),
			this.ito((t) => {
				this.oto(t), this.nto(e);
			});
	}
	PreAllPlay(e) {
		this.sto(() => {
			let t = this.Model.BlendInCharacter;
			if ((t = void 0 === t ? this.Model.SeqMainCharacter : t)) {
				const o = t;
				o.SkeletalMeshComponent0.SkeletalMesh ===
				Global_1.Global.BaseCharacter.Mesh.SkeletalMesh
					? (o.BeginSwitchPose(
							Global_1.Global.BaseCharacter,
							o,
							this.Model.SequenceData.AnimationBlendInTime,
							!0,
						),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Plot", 39, "BeginSwitchPose 开始", [
								"Actor",
								Global_1.Global.BaseCharacter?.GetName(),
							]),
						TimerSystem_1.TimerSystem.Next(() => {
							o.EndSwitchPose(o, !0),
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Plot", 39, "EndSwitchPose 结束", [
										"Actor",
										o,
									]),
								e(!0);
						}))
					: e(!0);
			} else e(!0);
		});
	}
	PreEachPlay() {
		this.w7s || (this.rto(), (this.w7s = !0));
		const e = UE.NewArray(UE.Actor);
		this.Model.BindingActorMap.forEach((t, o) => {
			t.K2_SetActorLocation(HidePos, !1, void 0, !0),
				e.Empty(),
				e.Add(t),
				this.Model.CurLevelSeqActor.SetBindingByTag(o, e, !1, !0),
				(o = t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass())) &&
					(t = o.GetLinkedAnimGraphInstanceByTag(
						SequenceDefine_1.ABP_Base_Name,
					)) &&
					t.Montage_MuteAllMontage();
		}),
			this.Model.BindingEntityMap.forEach((t, o) => {
				e.Empty(),
					(t = t.Entity.GetComponent(1).Owner),
					e.Add(t),
					this.Model.CurLevelSeqActor.SetBindingByTag(o, e, !1, !0);
			});
	}
	EachStop() {
		this.Model.BindingActorMap.forEach((e, t) => {
			e.K2_SetActorLocation(HidePos, !1, void 0, !0);
		});
	}
	async AllStopPromise() {
		(this.Promise = new CustomPromise_1.CustomPromise()),
			ModelManager_1.ModelManager.PlotModel.InSeamlessFormation &&
				(await PlotController_1.PlotController.CheckFormation()),
			this.TeleportToFinal(),
			this.hto(),
			this.Model.BindingEntityMap.clear();
		let e = this.Model.BlendOutCharacter;
		var t;
		return (e = void 0 === e ? this.Model.SeqMainCharacter : e)
			? ((t = e),
				this.B7s(!1),
				t.SkeletalMeshComponent0.SkeletalMesh !==
				Global_1.Global.BaseCharacter.Mesh.SkeletalMesh
					? (this.lto(), !(this.Promise = void 0))
					: ((this.Model.BeginSwitchFrame = 2),
						t.BeginSwitchPose(
							t,
							Global_1.Global.BaseCharacter,
							this.Model.SequenceData.AnimationBlendInTime,
							!0,
						),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Plot", 39, "BeginSwitchPose 开始", [
								"Actor",
								Global_1.Global.BaseCharacter?.GetName(),
							]),
						await this.Promise.Promise))
			: !(this.Promise = void 0);
	}
	EndSwitchPose() {
		let e = this.Model.BlendOutCharacter;
		(e = void 0 === e ? this.Model.SeqMainCharacter : e)?.EndSwitchPose(
			Global_1.Global.BaseCharacter,
			!0,
		),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 39, "EndSwitchPose结束", [
					"Actor",
					Global_1.Global.BaseCharacter?.GetName(),
				]),
			this.lto(),
			this.Promise && (this.Promise.SetResult(!0), (this.Promise = void 0));
	}
	TeleportToFinal() {
		var e,
			t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
		t?.Valid &&
			this.Model.SequenceData.SaveFinalTransform &&
			((e = this.Model.GetLastTransform())
				? (t.FixBornLocation("Sequence最终位置同步", !0, e.GetLocation(), !1),
					t.SetActorRotation(
						e.GetRotation().Rotator().ToUeRotator(),
						"Sequence最终位置同步",
					),
					t.ClearInput())
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Plot",
						27,
						"SequenceData内缺失FinalPos，联系演出进行后处理",
					));
	}
	End() {
		this.Xeo && this.Xeo.Cancel(),
			this.Yeo !== ResourceSystem_1.ResourceSystem.InvalidId &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Yeo),
				(this.Yeo = ResourceSystem_1.ResourceSystem.InvalidId)),
			this.Jeo !== ResourceSystem_1.ResourceSystem.InvalidId &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Jeo),
				(this.Jeo = ResourceSystem_1.ResourceSystem.InvalidId)),
			this.$eo && (this.$eo.Remove(), (this.$eo = void 0)),
			this.Promise && this.Promise.SetResult(!1),
			(this.Zeo = void 0),
			this.hto(),
			this.B7s(!1),
			this.lto();
	}
	tto() {
		(this.Model.BlendInCharacter = void 0),
			(this.Model.BlendOutCharacter = void 0);
		var e = this.Model.SequenceData.GeneratedData?.BindingBP;
		if (e) {
			var t = this.Model.SequenceData.GeneratedData?.BlendInTag,
				o = this.Model.SequenceData.GeneratedData?.BlendOutTag,
				i = this.Model.SequenceData.葫芦状态,
				a = e.Num();
			for (let s = 0; s < a; s++) {
				var n,
					r = e.Get(s),
					l = UE.KuroActorManager.SpawnActor(
						Info_1.Info.World,
						r,
						MathUtils_1.MathUtils.DefaultTransform,
						1,
						void 0,
					);
				ObjectUtils_1.ObjectUtils.IsValid(l)
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Plot", 27, "生成Seq绑定蓝图的Actor", [
								"Class",
								l.GetName(),
							]),
						(n = l) &&
							(this.Model.BindingActorMap.set(n.BindingTag, l),
							l.K2_SetActorLocation(HidePos, !1, void 0, !0),
							0 < i && n.ChangeHuluState(i),
							t &&
								t.op_Equality(n.BindingTag) &&
								!FNameUtil_1.FNameUtil.IsNothing(t) &&
								(this.Model.BlendInCharacter = n),
							o) &&
							o.op_Equality(n.BindingTag) &&
							!FNameUtil_1.FNameUtil.IsNothing(o) &&
							(this.Model.BlendOutCharacter = n))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Plot", 27, "Seq绑定蓝图生成Actor失败", [
							"Class",
							r.GetName(),
						]);
			}
		}
	}
	lto() {
		this.Model.BindingActorMap &&
			0 !== this.Model.BindingActorMap.size &&
			(this.Model.BindingActorMap.forEach((e) => {
				e.K2_SetActorLocation(HidePos, !1, void 0, !0),
					e && e.CleanHuluState(),
					UE.KuroActorManager.DestroyActor(e);
			}),
			this.Model.BindingActorMap.clear(),
			(this.Model.SeqMainCharacter = void 0),
			(this.Model.MainSeqCharacterMesh = void 0),
			(this.Model.BlendInCharacter = void 0),
			(this.Model.BlendOutCharacter = void 0));
	}
	B7s(e) {
		var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
		e
			? this.Model.HidePlayer ||
				(ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
					t,
					!1,
					"剧情播放Sequence隐藏主角",
					!1,
				),
				ModelManager_1.ModelManager.SceneTeamModel?.GetTeamEntities().forEach(
					(e) => {
						e?.Valid &&
							(e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
								e.Entity,
								Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantCustom,
							))?.Valid &&
							ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
								e.Entity,
								!1,
								"剧情播放Sequence隐藏伴生物",
							);
					},
				),
				(this.Model.HidePlayer = !0))
			: this.Model.HidePlayer &&
				(ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
					t,
					!0,
					"剧情播放Sequence隐藏主角",
					!1,
				),
				(this.Model.HidePlayer = !1));
	}
	ito(e) {
		const t = new Map();
		var o = this.Model.SequenceData.绑定角色标签,
			i = o.Num();
		if (0 === i) e(void 0);
		else {
			var a = new Array(),
				n = new Array();
			for (let e = 0; e < i; e++) {
				var r = o.Get(e);
				if (
					!SequenceDefine_1.HERO_TAG.op_Equality(r) &&
					((n.length = 0),
					ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(
						r.toString(),
						n,
					),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Plot",
							27,
							"Sequence绑定找到实体",
							["Tag", r.toString()],
							["num", n.length],
						),
					0 !== n.length)
				) {
					t.set(r, n);
					for (const e of n) {
						var l = e.Entity.GetComponent(0);
						a.push(l.GetCreatureDataId());
					}
				}
			}
			0 === a.length
				? e(void 0)
				: (this.Xeo = WaitEntityTask_1.WaitEntityTask.Create(
						a,
						(o) => {
							o ||
								(Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"Plot",
										27,
										"有需要绑定的实体，但实体创建失败了",
									)),
								(this.Xeo = void 0),
								e(t);
						},
						!0,
					));
		}
	}
	oto(e) {
		if (e) {
			var t,
				o =
					Global_1.Global.BaseCharacter?.CharacterActorComponent
						?.ActorLocationProxy;
			if (o) {
				let n;
				for (var [i, a] of e)
					if (a && 0 !== a.length)
						for (const e of a)
							e?.IsInit &&
								e?.Valid &&
								((t = e.Entity.GetComponent(1).ActorLocationProxy),
								(t = Vector_1.Vector.DistSquared(t, o)),
								void 0 === n || n > t) &&
								(this.Model.BindingEntityMap.set(i, e), (n = t));
				this.Model.BindingEntityMap.forEach((e, t) => {
					(e = e.Entity.GetComponent(0)?.GetCreatureDataId()),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Plot",
								27,
								"实体被绑定入Sequence：",
								["Tag", t.toString()],
								["PbDataId", e],
							);
				});
			}
		}
	}
	rto() {
		for (var [e, t] of this.Model.BindingEntityMap) {
			var o = new SequenceDefine_1.SequenceEntityInfo(),
				i =
					(this.Model.ControlEntityMap.set(t.Id, o), t.Entity.GetComponent(33)),
				e =
					((i =
						(i?.Valid && i.StopAllSkills("ActorAssistant.ControlBindingEntity"),
						t.Entity.GetComponent(1))),
					(i =
						(i?.Valid &&
							(i.SetCollisionEnable(!1, "Plot Sequence Binding"),
							i.SetSequenceBinding(!0),
							(0, RegisterComponent_1.isComponentInstance)(i, 3)) &&
							i.Actor.CharRenderingComponent?.ResetAllRenderingState(),
						t.Entity.GetComponent(57))),
					(e =
						(i?.Valid &&
							((o.CacheMovementSync = i.GetEnableMovementSync()),
							i.SetEnableMovementSync(!1)),
						e.op_Equality(SequenceDefine_1.BOSS_TAG) &&
							(i = t.Entity.GetComponent(160))?.Valid &&
							(i.StopMontage(), i.StartForceDisableAnimOptimization(3, !1)),
						t.Entity.GetComponent(36))),
					(i =
						(e?.Valid &&
							(e.StopMove(!0),
							(o.MoveCompDisableHandle = e.Disable("Plot Sequence Binding")),
							(o.CacheMovementMode =
								e.CharacterMovement.MovementMode.valueOf()),
							e.CharacterMovement.SetMovementMode(0)),
						t.Entity.GetComponent(98))),
					i?.Valid &&
						(o.UeMoveCompDisableHandle = i.Disable("Plot Sequence Binding")),
					t.Entity.GetComponent(157));
			e?.Valid &&
				e.AddBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, {
					InstigatorId: e.CreatureDataId,
					Reason: "ActorAssistant.ControlBindingEntity",
				}),
				t.Entity.GetComponent(38)?.DisableAi("Plot Sequence Binding");
		}
	}
	hto() {
		if (
			((this.w7s = !1),
			this.Model.BindingEntityMap && 0 !== this.Model.BindingEntityMap.size)
		) {
			for (var [e, t] of this.Model.BindingEntityMap) {
				var o,
					i,
					a,
					n = this.Model.ControlEntityMap.get(t.Id);
				t?.Entity &&
					((i = t.Entity.GetComponent(1))?.Valid &&
						(i.SetCollisionEnable(!0, "Plot Sequence Binding"),
						i.SetSequenceBinding(!1),
						(0, RegisterComponent_1.isComponentInstance)(i, 3)) &&
						(i.ClearInput(),
						i.Actor.CharRenderingComponent?.ResetAllRenderingState(),
						i.Actor.Mesh.SetBoundsScale(1),
						(o = i.Actor.GetComponentByClass(
							UE.SkeletalMeshComponent.StaticClass(),
						))) &&
						(o = o.GetLinkedAnimGraphInstanceByTag(
							SequenceDefine_1.ABP_Base_Name,
						)) &&
						o.StopSlotAnimation(0.2, SequenceDefine_1.ABP_Seq_Slot_Name),
					e.op_Equality(SequenceDefine_1.BOSS_TAG) &&
						(o = t.Entity.GetComponent(160))?.Valid &&
						(o.CancelForceDisableAnimOptimization(3), o.ConsumeRootMotion()),
					(e = t.Entity.GetComponent(57))?.Valid &&
						n.CacheMovementSync &&
						(e.SetEnableMovementSync(!0), e.CollectSampleAndSend(!0)),
					WorldFunctionLibrary_1.default.GetEntityTypeByEntity(t.Entity.Id) ===
						Protocol_1.Aki.Protocol.wks.Proto_Npc &&
						((e = Protocol_1.Aki.Protocol.Zhs.create()),
						((a = Protocol_1.Aki.Protocol.o2s.create()).rkn =
							MathUtils_1.MathUtils.NumberToLong(
								i.CreatureData.GetCreatureDataId(),
							)),
						(a.$kn = i.ActorLocationProxy),
						(a.D3n = i.ActorRotationProxy),
						(e.m4n = [a]),
						Net_1.Net.Send(24100, e),
						Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info(
							"AI",
							43,
							"向服务器同步NPC位置",
							["实体ID", a.rkn],
							["X", a.$kn.X],
							["Y", a.$kn.Y],
							["Z", a.$kn.Z],
						),
					(i = t.Entity.GetComponent(36))?.Valid &&
						(i.StopMove(!1),
						i.Enable(
							n.MoveCompDisableHandle,
							"[ActorAssistant.ReleaseBindingEntity] moveComp.Valid=true",
						),
						i.CharacterMovement.SetMovementMode(n.CacheMovementMode)),
					(e = t.Entity.GetComponent(98))?.Valid &&
						e.Enable(
							n.UeMoveCompDisableHandle,
							"[ActorAssistant.ReleaseBindingEntity] ueMoveComp.Valid=true",
						),
					(a = t.Entity.GetComponent(157))?.Valid &&
						a.RemoveBuff(
							CharacterBuffIds_1.buffId.StoryInvincibleCommon,
							-1,
							"ActorAssistant.ReleaseBindingEntity",
						),
					t.Entity.GetComponent(38)?.EnableAi("Plot Sequence Binding"));
			}
			this.Model.BindingEntityMap.clear();
		}
	}
	nto(e) {
		if (
			((this.Model.MainSeqCharacterMesh = void 0),
			this.Model.SequenceData.NeedSwitchMainCharacter)
		) {
			if (!this.Model.SeqMainCharacterModelConfig) {
				var t =
					ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(9);
				let e = SequenceDefine_1.FEMALE_SEQ_MODEL_ID;
				t === LoginDefine_1.ELoginSex.Boy &&
					(e = SequenceDefine_1.MALE_SEQ_MODEL_ID),
					(t = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
						0,
						e.toString(),
					)),
					(this.Model.SeqMainCharacterModelConfig = t);
			}
			(t = this.Model.SeqMainCharacterModelConfig.网格体?.ToAssetPathName()),
				t && t.length && "None" !== t
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角-开始"),
						(this.Jeo = ResourceSystem_1.ResourceSystem.LoadAsync(
							t,
							UE.SkeletalMesh,
							(t) => {
								(this.Jeo = ResourceSystem_1.ResourceSystem.InvalidId),
									t
										? ((this.Model.MainSeqCharacterMesh = t),
											Log_1.Log.CheckDebug() &&
												Log_1.Log.Debug(
													"Plot",
													18,
													"剧情加载等待-Seq主角-完成",
												))
										: Log_1.Log.CheckDebug() &&
											Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角-失败"),
									e(!0);
							},
						)))
					: (ControllerHolder_1.ControllerHolder.FlowController.LogError(
							"Seq主角的ModelConfig网格体为空",
							["ID", this.Model.SeqMainCharacterModelConfig?.ID],
						),
						e(!0));
		} else e(!0);
	}
	sto(e) {
		var t;
		this.Model.SequenceData.NeedSwitchMainCharacter
			? (t = this.Model.SeqMainCharacterModelConfig.蓝图?.ToAssetPathName()) &&
				t.length &&
				"None" !== t
				? (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角BP-开始"),
					(this.Yeo = ResourceSystem_1.ResourceSystem.LoadAsync(
						t,
						UE.Class,
						(t) => {
							(this.Yeo = ResourceSystem_1.ResourceSystem.InvalidId),
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角BP-完成"),
								(this.Model.SeqMainCharacter = UE.KuroActorManager.SpawnActor(
									Info_1.Info.World,
									t,
									Global_1.Global.BaseCharacter.CharacterActorComponent
										.ActorTransform,
									1,
									void 0,
								));
							var o =
								((t = this.Model.SeqMainCharacter.GetComponentByClass(
									UE.SkeletalMeshComponent.StaticClass(),
								))
									? (t.SetSkeletalMesh(this.Model.MainSeqCharacterMesh),
										(0 !== this.Model.Type && 2 !== this.Model.Type) ||
											((o = t.GetRelativeTransform()),
											this.Model.SeqMainCharacter.K2_AddActorWorldTransform(
												o,
												!1,
												void 0,
												!1,
											),
											t.K2_SetRelativeLocationAndRotation(
												Vector_1.Vector.ZeroVector,
												Rotator_1.Rotator.ZeroRotator,
												!1,
												void 0,
												!1,
											)))
									: ControllerHolder_1.ControllerHolder.FlowController.LogError(
											"网格体类型错误",
										),
								this.Model.SeqMainCharacter);
							o &&
								0 < (t = this.Model.SequenceData.葫芦状态) &&
								(Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Plot", 39, "葫芦状态", ["HuluState", t]),
								o.ChangeHuluState(t)),
								this.Model.SeqMainCharacter.K2_SetActorLocation(
									HidePos,
									!1,
									void 0,
									!0,
								),
								this.Model.BindingActorMap.set(
									SequenceDefine_1.HERO_TAG,
									this.Model.SeqMainCharacter,
								),
								e();
						},
					)))
				: ControllerHolder_1.ControllerHolder.FlowController.LogError(
						"Seq主角的ModelConfig蓝图为空",
						["ID", this.Model.SeqMainCharacterModelConfig?.ID],
					)
			: e();
	}
	TriggerCutChange() {
		this.Model.BindingActorMap.forEach((e, t) => {
			e && e.JumpFrame();
		});
	}
	_to() {
		if (this.CurLoadMouthIndex >= this.PreLoadMouthAssetName.length)
			this.eto.SetResult(!0);
		else {
			const t = this.PreLoadMouthAssetName[this.CurLoadMouthIndex];
			if ((this.CurLoadMouthIndex++, StringUtils_1.StringUtils.IsEmpty(t)))
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Plot", 39, "预加载口型资源跳过，textKey 为空"),
					this._to();
			else {
				var e = PlotAudioById_1.configPlotAudioById.GetConfig(t);
				if (e) {
					const o = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName([
						e.IsCheckSex,
						e.FileName,
					]);
					ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.AnimSequence, (e) => {
						e
							? (this.PreLoadMouthAssetMap.set(t, e),
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Plot", 39, "预加载口型资源", [
										"assetPath",
										o,
									]))
							: Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Plot",
									39,
									"预加载口型资源错误：有语音没口型",
									["textKey", t],
									["assetPath", o],
								),
							this._to();
					});
				} else
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 39, "预加载口型资源跳过，没有语音配置", [
							"textKey",
							t,
						]),
						this._to();
			}
		}
	}
	async BeginLoadMouthAssetPromise() {
		return (
			(this.eto = new CustomPromise_1.CustomPromise()),
			(this.CurLoadMouthIndex = 0),
			this.PreLoadMouthAssetMap.clear(),
			void 0 === this.PreLoadMouthAssetName ||
				0 === this.PreLoadMouthAssetName.length ||
				(this._to(), this.eto.Promise)
		);
	}
	TryApplyMouthAnim(e, t) {
		this.StopMouthAnim(),
			(this.zeo = void 0),
			(this.Zeo = void 0),
			1 === this.Model.Type &&
				((this.zeo = this.PreLoadMouthAssetMap.get(e)),
				this.zeo
					? (this.FindApplyMouthAnim(t),
						this.Zeo
							? (this.Zeo.PlaySlotAnimationAsDynamicMontage(
									this.zeo,
									SequenceDefine_1.ABP_Mouth_Slot_Name,
									0,
									0,
									1,
									1,
									-1,
									0,
									!0,
								),
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Plot",
										39,
										"MouthAnim 播放口型",
										["Key", e],
										["Asset", this.zeo.GetName()],
										["ABP", this.Zeo.GetName()],
									))
							: Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn("Plot", 39, "MouthAnim 没有找到口型ABP", [
									"whoID",
									t,
								]))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Plot", 39, "MouthAnim 没有口型资源", [
							"TextKey",
							e,
						]));
	}
	FindApplyMouthAnim(e) {
		let t = !1;
		if (
			(this.Model.BindingActorMap.forEach((o) => {
				!o?.IsValid() ||
					(o.TalkID !== e && o.TalkID_SP !== e) ||
					((this.Zeo =
						o.SkeletalMeshComponent0?.GetLinkedAnimGraphInstanceByTag(
							SequenceDefine_1.ABP_Base_Name,
						)),
					(t = !0));
			}),
			!t && void 0 !== this.Model.TalkNpcList)
		) {
			var o = this.Model.TalkNpcList.Num();
			for (let t = 0; t < o; t++) {
				var i = this.Model.TalkNpcList.Get(t),
					a = i;
				if (
					a?.IsValid() &&
					(a.TalkID === e || a.TalkID_SP === e) &&
					((this.Zeo = a.Skel_Main?.GetAnimInstance()), this.Zeo)
				)
					return;
				if (
					((a = i),
					a?.IsValid() &&
						(a.TalkID === e || a.TalkID_SP === e) &&
						((this.Zeo = a.SkeletalMesh?.GetAnimInstance()), this.Zeo))
				)
					return;
			}
		}
	}
	StopMouthAnim() {
		this.Zeo &&
			(this.Zeo.StopSlotAnimation(0, SequenceDefine_1.ABP_Mouth_Slot_Name),
			(this.Zeo = void 0));
	}
	CheckHideBattleCharacter() {
		(this.Model.SequenceData.HidePlayer ||
			this.Model.SequenceData.NeedSwitchMainCharacter) &&
			this.B7s(!0);
	}
}
exports.ActorAssistant = ActorAssistant;
