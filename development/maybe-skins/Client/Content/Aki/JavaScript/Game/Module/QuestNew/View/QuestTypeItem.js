"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestTypeItem = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	QuestChapterItem_1 = require("./QuestChapterItem"),
	QuestItem_1 = require("./QuestItem");
class QuestItemData {
	constructor(t, e) {
		(this.QuestId = t), (this.QuestType = e);
	}
}
class QuestTypeItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.vro = void 0),
			(this.QuestType = 0),
			(this.bro = void 0),
			(this.qro = void 0),
			(this.Gro = void 0),
			(this.Nro = void 0),
			(this.Oro = () => {
				var t = this.GetItem(1);
				t.SetUIActive(!t.bIsUIActive);
			});
	}
	Init(t, e, s) {
		(this.QuestType = e),
			(this.vro = s),
			t.SetUIActive(!0),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UISprite],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UISprite],
		]),
			(this.BtnBindInfo = [[0, this.Oro]]);
	}
	OnStart() {
		this.GetItem(4).SetUIActive(!0);
		var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
			this.QuestType,
		);
		StringUtils_1.StringUtils.IsEmpty(t?.TypeColor) ||
			this.GetSprite(7).SetColor(UE.Color.FromHex(t?.TypeColor ?? "")),
			this.GetText(2).SetText(
				ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeName(
					this.QuestType,
				),
			);
		var e;
		t = t.QuestTypeTitleIcon;
		0 !== t?.length &&
			((e = this.GetSprite(3)), this.SetSpriteByPath(t, e, !1)),
			(this.bro = []),
			(this.qro = []),
			this.UpdateList();
	}
	OnTick(t) {
		if (this.qro) for (const e of this.qro) e.OnTick(t);
		if (this.bro) for (const e of this.bro) e.OnTick(t);
	}
	UpdateList() {
		this.kro();
		const t = this.Gro,
			e = this.Nro;
		let s = 0;
		for (const t of e) {
			let e;
			var i;
			s < this.qro.length
				? (e = this.qro[s]).UpdateItem(t.ChapterId, t.QuestType, t.QuestList)
				: ((i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(6), this.GetItem(1))),
					(e = new QuestChapterItem_1.QuestChapterItem()).Init(
						i,
						t.ChapterId,
						t.QuestType,
						t.QuestList,
						this.vro,
					),
					this.qro.push(e)),
				s++;
		}
		this.qro.forEach((t, s) => {
			t.SetActive(s < e.length);
		}),
			(s = 0);
		for (const e of t) {
			let t;
			var o;
			s < this.bro.length
				? (t = this.bro[s])
				: ((o = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(5), this.GetItem(1))),
					(t = new QuestItem_1.QuestItem(this.vro)).SetRootActor(
						o.GetOwner(),
						!0,
					),
					this.bro.push(t)),
				t.UpdateItem(e.QuestId, e.QuestType),
				s++;
		}
		this.bro.forEach((e, s) => {
			e.SetActiveItem(s < t.length);
		});
	}
	UpdateItem(t) {
		let e = this.bro.find((e) => e.QuestId === t);
		if (!e)
			for (const i of this.qro) {
				var s = i.FindByQuestId(t);
				if (s) {
					e = s;
					break;
				}
			}
		e && e.UpdateItem(e.QuestId, e.QuestType);
	}
	OnSelect(t) {
		let e = t;
		t || ((t = this.GetDefaultItem()), (e = t?.QuestId ?? 0)),
			this.bro.forEach((t) => {
				t.SetSelected(t.QuestId === e), t.SetNotAllowNoneSelect();
			});
		for (const t of this.qro) {
			let s = !1;
			t.QuestList.forEach((t) => {
				t.SetSelected(t.QuestId === e),
					t.SetNotAllowNoneSelect(),
					t.QuestId === e && (s = !0);
			}),
				t.SetSelected(s);
		}
	}
	GetDefaultItem() {
		if (0 !== this.bro.length || 0 !== this.qro.length)
			return (0 !== this.qro.length ? this.qro[0].QuestList : this.bro)[0];
	}
	IsQuestEmpty() {
		return 0 === this.Gro?.length && 0 === this.qro?.length;
	}
	UpdateListTrackState() {
		for (const e of this.bro) {
			e.UpdateTrackIconActive();
			var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.QuestId);
			t && e.UpdateFunctionIcon(t);
		}
		for (const t of this.qro)
			for (const s of t.QuestList) {
				s.UpdateTrackIconActive();
				var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(s.QuestId);
				e && s.UpdateFunctionIcon(e);
			}
	}
	GetQuestItem(t) {
		for (const s of this.qro) {
			var e = s.QuestList.find((e) => e.QuestId === t);
			if (e) return e;
		}
		return this.bro.find((e) => e.QuestId === t);
	}
	kro() {
		(this.Gro = []), (this.Nro = []);
		for (const e of ConfigManager_1.ConfigManager.QuestNewConfig.GetQuesTypesByMainType(
			this.QuestType,
		)) {
			var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(e.Id);
			if (t) {
				t.sort((t, e) => t.Id - e.Id);
				for (const e of t)
					e.CanShowInUiPanel() &&
						(e.ChapterId
							? this.Fro(e.ChapterId, e.Type, e.Id)
							: this.Gro.push(new QuestItemData(e.Id, e.Type)));
			}
		}
	}
	Fro(t, e, s) {
		for (const e of this.Nro)
			if (e.ChapterId === t) return void e.QuestList.push(s);
		this.Nro.push({ ChapterId: t, QuestType: e, QuestList: [s] });
	}
}
exports.QuestTypeItem = QuestTypeItem;
