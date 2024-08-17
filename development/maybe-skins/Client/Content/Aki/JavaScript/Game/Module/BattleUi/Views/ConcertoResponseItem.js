"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConcertoResponseItem = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	SceneTeamDefine_1 = require("../../SceneTeam/SceneTeamDefine"),
	BattleUiRoleData_1 = require("../BattleUiRoleData"),
	BattleChildView_1 = require("./BattleChildView/BattleChildView");
class ConcertoResponseItem extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.wnt = void 0),
			(this.E0 = void 0),
			(this.Bnt = void 0),
			(this.bnt = void 0),
			(this.qnt = void 0),
			(this.hJ = 0),
			(this.WQe = (e, t, i) => {
				e === this.E0 && t === this.qnt && this.wnt && this.Gnt(i);
			}),
			(this.Nnt = (e, t, i) => {
				e === this.E0 && this.RefreshVisible();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
		];
	}
	Initialize(e) {
		super.Initialize(e), this.Ore();
	}
	OnBeforeDestroy() {
		this.Refresh(void 0);
	}
	Reset() {
		this.kre(), super.Reset();
	}
	Refresh(e) {
		e && 2 !== e.RoleConfig?.RoleType
			? ((this.wnt = e),
				(this.E0 = e?.EntityHandle?.Id),
				(this.Bnt = this.wnt.GameplayTagComponent),
				(this.bnt = this.wnt.ElementConfig),
				0 !== this.hJ &&
					(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ),
					(this.hJ = 0)),
				this.Ont(this.wnt.ElementType),
				this.Gnt(this.GetElementValue()),
				this.RefreshVisible())
			: ((this.wnt = void 0),
				(this.E0 = void 0),
				(this.Bnt = void 0),
				(this.qnt = void 0),
				(this.bnt = void 0),
				this.SetActive(!1));
	}
	GetEntityId() {
		return this.E0;
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BattleUiElementEnergyChanged,
			this.WQe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiElementHideTagChanged,
				this.Nnt,
			);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BattleUiElementEnergyChanged,
			this.WQe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiElementHideTagChanged,
				this.Nnt,
			);
	}
	RefreshVisible() {
		if (this.wnt)
			if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10036)) {
				for (const e of BattleUiRoleData_1.BattleUiRoleData.HideElementTagList)
					if (this.Bnt.HasTag(e)) return void this.SetActive(!1);
				this.SetActive(!0);
			} else this.SetActive(!1);
	}
	Ont(e) {
		var t, i, n;
		this.qnt !== e &&
			((t = this.bnt.Icon5),
			(i = this.GetTexture(1)),
			(n = this.GetSprite(0)),
			this.SetElementIcon(t, i, this.qnt),
			i.SetColor(this.wnt.ElementColor),
			n.SetColor(this.wnt.ElementColor),
			(this.qnt = e));
	}
	Gnt(e) {
		var t = this.GetSprite(0);
		e /= SceneTeamDefine_1.MAX_ELEMENT_ENERGY;
		t.SetFillAmount(e);
	}
	GetElementValue() {
		var e;
		return this.wnt && (e = this.wnt.GetElementAttributeId())
			? this.wnt.AttributeComponent.GetCurrentValue(e)
			: 0;
	}
}
exports.ConcertoResponseItem = ConcertoResponseItem;
