
exports.seed = async function(knex, Promise) {
    await settings()
    await tickets()
    await combos()
    await comboTicket()

    async function settings() {
        const tbl = knex('gmt_settings')
        await tbl.del()
        await tbl.insert([
            {
                id: 1,
                name: 'holi-price-adult',
                value: JSON.stringify([
                    {
                        type: 'weekdays',
                        days: [5, 6],
                        price: 180000,
                    },
                    {
                        type: 'holidays',
                        days: ['1/1', '8/3', '30/4', '1/5', '2/9', '20/10', '24/12'],
                        price: 180000,
                    }
                ]),
            },
            {
                id: 2,
                name: 'holi-price-child',
                value: JSON.stringify([
                    {
                        type: 'weekdays',
                        days: [5, 6],
                        price: 130000,
                    },
                    {
                        type: 'holidays',
                        days: ['1/1', '8/3', '30/4', '1/5', '2/9', '20/10', '24/12'],
                        price: 130000,
                    }
                ]),
            },
            {
                id: 3,
                name: 'holi-price-combo',
                value: JSON.stringify([
                    {
                        type: 'weekdays',
                        days: [5, 6],
                        price: 450000,
                    },
                    {
                        type: 'holidays',
                        days: ['1/1', '8/3', '30/4', '1/5', '2/9', '20/10', '24/12'],
                        price: 450000,
                    }
                ]),
            },
        ]);
    }

    async function tickets() {
        const tbl = knex('gmt_tickets')
        await tbl.del()
        await tbl.insert([
            {
                id: 1,
                name: 'Người lớn',
                price: 150000,
                code_prefix: 'AD',
                is_enabled: true,
                price_settings_id: 1,
            },
            {
                id: 2,
                name: 'Trẻ em',
                price: 100000,
                code_prefix: 'CH',
                description: 'Chiều cao dưới 1.2 mét',
                is_enabled: true,
                price_settings_id: 2,
            },
        ]);
    }

    async function combos() {
        const tbl = knex('gmt_combos')
        await tbl.del()
        await tbl.insert([
            {
                id: 1,
                name: 'Gia đình',
                description: '02 người lớn + 02 trẻ em (dưới 1.2m)',
                price: 350000,
                code_prefix: 'FAM',
                is_enabled: true,
                price_settings_id: 3,
            }
        ]);
    }

    async function comboTicket() {
        const tbl = knex('gmt_combo_ticket')
        await tbl.del()
        await tbl.insert([
            {
                combo_id: 1,
                ticket_id: 1,
                quantity: 2
            },
            {
                combo_id: 1,
                ticket_id: 2,
                quantity: 2
            },
        ]);
    }
};
