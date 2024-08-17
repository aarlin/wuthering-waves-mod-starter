"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MissionPanelStep = void 0);
const ue_1 = require("ue"),
	GeneralLogicTreeDefine_1 = require("../../../GeneralLogicTree/Define/GeneralLogicTreeDefine"),
	TreeStepBase_1 = require("../../../GeneralLogicTree/View/TreeStep/TreeStepBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	MissionPanelChildStep_1 = require("./MissionPanelChildStep"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	PublicUtil_1 = require("../../../../Common/PublicUtil"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
class MissionPanelStep extends TreeStepBase_1.TreeStepBase {
	constructor() {
		super(...arguments),
			(this.But = void 0),
			(this.but = []),
			(this.TitleSequencePlayer = void 0),
			(this.G_t = 0),
			(this.gAn = void 0),
			(this.PlayStartSequence = (e, t, i) => (
				(this.G_t = e),
				this.Kbn(t, i),
				this.fAn()
					? (this.TitleSequencePlayer.StopCurrentSequence(!0, !0),
						this.TitleSequencePlayer.PlayLevelSequenceByName("Start"),
						"Disabled" !==
							ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() &&
							this.TitleSequencePlayer.StopCurrentSequence(!0, !0),
						!1)
					: (this.SetUiActive(!0), this.pAn(this.G_t))
			)),
			(this.hut = () => {
				this.G_t &&
					(EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.MissionPanelProcessEnd,
						this.G_t,
					),
					(this.G_t = 0));
			}),
			(this.ZPt = (e) => {
				switch (e) {
					case "Start":
						this.SetUiActive(!0);
						break;
					case "Close":
					case "Finish":
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.MissionPanelStepTitleAnimStart,
							this.TreeIncId,
						);
				}
			}),
			(this.aut = (e) => {
				switch (e) {
					case "Start":
						this.pAn(this.G_t);
						break;
					case "Close":
					case "Finish":
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.MissionPanelStepTitleAnimEnd,
							this.TreeIncId,
						),
							this.gAn ? this.gAn() : this.hut();
				}
			});
	}
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.ComponentRegisterInfos.push([2, ue_1.UIItem]),
			this.ComponentRegisterInfos.push([3, ue_1.UIItem]);
	}
	OnStart() {
		super.OnStart();
		var e =
				((e = this.GetItem(3)).SetUIActive(!0),
				(this.TitleSequencePlayer =
					new LevelSequencePlayer_1.LevelSequencePlayer(e)),
				this.TitleSequencePlayer.BindSequenceStartEvent(this.ZPt),
				this.TitleSequencePlayer.BindSequenceCloseEvent(this.aut),
				this.GetItem(2)),
			t = new MissionPanelChildStep_1.MissionPanelChildStep();
		t.SetRootActor(e.GetOwner(), !0), this.but.push(t), e?.SetUIActive(!1);
	}
	Dispose() {
		if ((super.Dispose(), this.but)) for (const e of this.but) e.Dispose();
		this.TitleSequencePlayer?.Clear(), (this.TitleSequencePlayer = void 0);
	}
	PlayCloseSequence(e) {
		return this.fAn()
			? ((this.gAn = e),
				this.TitleSequencePlayer.StopCurrentSequence(!0, !0),
				(e = this.j4s() ? "Finish" : "Close"),
				this.TitleSequencePlayer.PlayLevelSequenceByName(e),
				!!(e =
					"Disabled" !==
					ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode()) &&
					(this.TitleSequencePlayer.StopCurrentSequence(!0, !0), !0))
			: (e(), !0);
	}
	PauseSequence() {
		this.TitleSequencePlayer.GetCurrentSequence() &&
			this.TitleSequencePlayer.PauseSequence();
	}
	ResumeSequence() {
		this.TitleSequencePlayer.GetCurrentSequence() &&
			this.TitleSequencePlayer.ResumeSequence();
	}
	async ExecuteSequenceOnUpdate(e, t, i) {
		this.G_t = e;
		var s = this.But,
			n = t.TrackTextConfig;
		if (
			(0, GeneralLogicTreeDefine_1.CheckMainTitleSame)(s.MainTitle, n.MainTitle)
		)
			return (
				await this.Qbn(0, s.SubTitles),
				i(),
				this.Kbn(t.TreeIncId, n),
				this.pAn(this.G_t)
			);
		if (
			(await this.Qbn(0, s.SubTitles),
			(s = PublicUtil_1.PublicUtil.GetConfigTextByKey(
				s.MainTitle?.TidTitle ?? "",
			)),
			!StringUtils_1.StringUtils.IsBlank(s))
		) {
			const e = new CustomPromise_1.CustomPromise();
			this.PlayCloseSequence(() => {
				e.SetResult(!0);
			}),
				await e.Promise;
		}
		return i(), this.PlayStartSequence(e, t.TreeIncId, n);
	}
	pAn(e) {
		this.qut();
		var t = this.But?.SubTitles;
		if (!t?.length) return this.hut(), !0;
		for (let i = 0; i < t.length; i++) this.but[i].PlayStartSequence(e);
		return !1;
	}
	async Qbn(e, t) {
		if (t?.length) {
			let i = 0;
			const s = new CustomPromise_1.CustomPromise();
			for (let n = 0; n < t.length; n++)
				this.but[n].PlayCloseSequence(e, () => {
					++i === t.length && s.SetResult(!0);
				});
			await s.Promise;
		}
	}
	Update(e, t) {
		this.Kbn(e, t), this.qut();
	}
	Kbn(e, t) {
		(this.But = t), this.UpdateData(e, this.But?.MainTitle);
	}
	qut() {
		const e = this.GetItem(2);
		if (e) {
			const t = this.But;
			if (t && t.SubTitles) {
				let i = 0;
				t.SubTitles.forEach((t) => {
					let s;
					var n;
					this.but.length > i
						? (s = this.but[i])
						: ((n = LguiUtil_1.LguiUtil.CopyItem(e, e.GetParentAsUIItem())),
							(s =
								new MissionPanelChildStep_1.MissionPanelChildStep()).SetRootActor(
								n.GetOwner(),
								!0,
							),
							this.but.push(s)),
						s.UpdateData(this.TreeIncId, t),
						i++;
				}),
					this.but.forEach((e, i) => {
						e.DisableUi(i < t.SubTitles.length);
					});
			} else
				this.but.forEach((e, t) => {
					e.DisableUi(!1);
				});
		}
	}
	fAn() {
		var e;
		return (
			void 0 !== this.But?.MainTitle &&
			((e = PublicUtil_1.PublicUtil.GetConfigTextByKey(
				this.But?.MainTitle.TidTitle,
			)),
			!StringUtils_1.StringUtils.IsBlank(e))
		);
	}
	j4s() {
		var e = this.But?.MainTitle?.QuestScheduleType;
		if (e && e.Type === IQuest_1.EQuestScheduleType.ChildQuestCompleted) {
			var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
				this.TreeIncId,
			);
			if (t && (t = t.GetNode(e.ChildQuestId))) return t.IsSuccess;
		}
		return !0;
	}
}
exports.MissionPanelStep = MissionPanelStep;
